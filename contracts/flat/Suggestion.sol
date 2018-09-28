pragma solidity ^0.4.24;

import "D:/Blockchain-JS/suggestion-box/contracts/node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Person.sol";

contract Suggestion {
    enum State { unhandled, undergoing, rejected, completed, deleted }

    Suggestion[] public suggestions;
    uint256 public counter_suggestion = 0;
    mapping(uint256 => uint256) public counter_comment = 0; //counting the comments of a specified suggestion.

    struct Suggestion {
        string owner;
        State state;
        comment[] comments;
        uint256 last_comment_time;
        string title;
        string content;
        uint256 timestamp;
        string operator;        //who accept, complete, reject the suggestion
    }

    struct comment {
        string commenter;
        string content;
        uint256 timestamp;
    }

    function createSuggestion(string _owner, string _header, string _content){

    }

    function acceptSuggestion(uint256 _index) onlyManager {

    }

    function completeSuggestion(uint256 _index) onlyManager {

    }

    function rejectSuggestion(uint256 _index) onlyManager {

    }

    function deleteSuggestion(uint256 _index) onlyCreator {

    }

    function createComment(uint256 _index, string _content) {

    }





}