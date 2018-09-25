pragma solidity ^0.4.24;

import "D:/Blockchain-JS/suggestion-box/contracts/node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Person.sol";

contract Suggestion {
    enum State { unhandled, rejected, completed, deleted }

    Suggestion[] public suggestions;
    uint256 public counter_suggestion = 0;
    mapping(uint256 => uint256) public counter_comment = 0; //counting the comments of a specified suggestion.

    struct Suggestion {
        string suggester;
        State state;
        comment[] comments;
        uint256 last_comment;
    }

    struct comment {
        string commenter;
        string content;
        uint256 timestamp;
    }





}