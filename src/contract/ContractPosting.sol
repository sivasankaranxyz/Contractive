// // SPDX-License-Identifier: MIT
pragma solidity 0.6.9;
import "./SafeMath.sol";


//SPDX-License-Identifier: <SPDX-License>

contract ContractPosting {
    using SafeMath for uint256;

    // This struct is for the properties of a post.
    struct Post {
        address owner;
        string contracttitleHash;
        string contracttextHash;
        string signimgHash;
    }

    // A mapping list for posts from Post struct.
    mapping(uint256 => Post) posts;

    // A counter for the posts mapping list.
    uint256 postCtr;

    // Event which will notify new posts.
    event NewPost();

    /**
     * @dev Function to store contracttitle, contracttext and signimg hashes.
     * @param _contracttitle hash from IPFS.
     * @param _contracttext hash from IPFS.
     * @param _signimg hash from IPFS.
     */
    //sendHash(_contracttitle, _contracttext, _signimg ) — sends the contracttitle, contracttext and signimg hashes and stores it.
    function sendHash(
        string memory _contracttitle,
        string memory _contracttext,
        string memory _signimg
    ) public {
        postCtr = postCtr.add(1);
        Post storage posting = posts[postCtr];
        posting.owner = msg.sender;
        posting.contracttitleHash = _contracttitle;
        posting.contracttextHash = _contracttext;
        posting.signimgHash = _signimg;

        emit NewPost();
    }

    /**
     * @dev Function to get contracttitle contracttext and signimg hashes.
     * @param _index number from total posts iteration.
     * @return contracttitle contracttext and signimg hashes.
     */
    //getHash(_index) — gets the contracttitle, contracttext and signimg hashes using an index number.
    function getHash(uint256 _index)
        public
        view
        returns (
            string memory contracttitle,
            string memory contracttext,
            string memory signimg,
            address owner
        )
    {
        owner = posts[_index].owner;
        contracttitle = posts[_index].contracttitleHash;
        contracttext = posts[_index].contracttextHash;
        signimg = posts[_index].signimgHash;
    }

    /**
     * @dev Function to get length of total posts.
     * @return The total count of posts.
     */
    //getCounter() — gets the total number of posts that are already stored.
    function getCounter() public view returns (uint256) {
        return postCtr;
    }
}
