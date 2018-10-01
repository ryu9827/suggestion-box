pragma solidity ^0.4.24;

import "D:/Blockchain-JS/suggestion-box/contracts/node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Person.sol";

contract Suggestion is Person{
    enum State { unhandled, undergoing, rejected, completed, deleted }

    Suggestion[] public suggestions;
    uint256 public counter_suggestion = 0;

    // comment[] public comments;
    mapping(uint256 => Comment[]) public comments; //[suggestion index] => [Comment]
    mapping(uint256 => uint256)   public counter_comment; //[suggestion index]=>[comment counter]. counting the comments of a specified suggestion.

    struct Suggestion {
        string owner;
        State state;
        uint256 last_comment_time;
        string title;
        string content;
        uint256 timestamp;
        string operator;        //who accept, complete, reject the suggestion
    }

    struct Comment {
        string commenter;
        string content;
        uint256 timestamp;
    }

    function createSuggestion(string _owner, string _title, string _content){
        Suggestion memory Sugg;
        Sugg.owner = _owner;
        Sugg.state = State.unhandled;
        Sugg.last_comment_time = now;
        Sugg.title = _title;
        Sugg.content = _content;
        Sugg.timestamp = now;
        Sugg.operator = "";  
        suggestions.push(Sugg);
        counter_suggestion ++;
    }

    function acceptSuggestion(uint256 _index, bytes32 _nameBytes) public onlyManager(_nameBytes) {
        suggestions[_index].state = State.undergoing;
    }

    function completeSuggestion(uint256 _index, bytes32 _nameBytes) public onlyManager(_nameBytes) {
        suggestions[_index].state = State.completed;
    }

    function rejectSuggestion(uint256 _index, bytes32 _nameBytes) public onlyManager(_nameBytes) {
        suggestions[_index].state = State.rejected;
    }

    function deleteSuggestion(uint256 _index, bytes32 _nameBytes) public {
        require(_nameBytes == keccak256(suggestions[_index].owner), "Only onwer can delete this suggestion.");
        suggestions[_index].state = State.deleted;
    }

    function getSuggestionLength() public view returns(uint256){
        return counter_suggestion;
    }

    function getSignleSuggestion(uint256 _index) public view 
    returns(
        string owner,
        State state,
        uint256 last_comment_time,
        string title,
        string content,
        uint256 timestamp,
        string operator
    )
    {
        Suggestion s = suggestions[_index];
        owner = s.owner;
        state = s.state;
        last_comment_time = s.last_comment_time;
        title = s.title;
        content = s.content;
        timestamp = s.timestamp;
        operator = s.operator;
    }

    /*
    @param _name: the commenter's name
    @param _index: the index of the suggestion where this comment belongs to
    @param _content: the content of the comment.
    */
    function createComment(string _name, uint256 _index, string _content) public {
        require(isExisted(keccak256(_name)));
        Comment memory comm;
        comm.commenter = _name;
        comm.content = _content;
        comm.timestamp = now;
        counter_comment[_index] ++;
        suggestions[_index].last_comment_time = now;
    }

    //input the index of a suggestion and get back the counter of its comments.
    function getCommentLength(uint256 _index) public view returns(uint256) {
        return counter_comment[_index];
    }

    // function getComments(uint256 _suggestionIndex ) public view returns(Comment[]) {
    //     return comments[_suggestionIndex];
    // }

    function getSingleComment(uint256 _suggestionIndex, uint256 _commentIndex) public view returns(
        string commenter,
        string content,
        uint256 timestamp
    )
    {
        Comment memory comm = comments[_suggestionIndex][_commentIndex];
        commenter = comm.commenter;
        content = comm.content;
        timestamp = comm.timestamp;
    }
}