// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PolicyContract {
    struct Policy {
        address policyHolder;
        string cropType;
        uint256 area;
        string policyFor;
        string location;
        uint256 premium;
        bool active;
        bool eligibleForClaim;
    }

    mapping(address => Policy) public policies;

    event PolicyCreated(
        address indexed policyHolder,
        string cropType,
        uint256 area,
        string policyFor,
        string location,
        uint256 premium
    );

    event ClaimTriggered(
        address indexed policyHolder,
        uint256 timestamp,
        string reason
    );

    // Function to create a policy with a premium payment
    function createPolicy(
        string memory _cropType,
        uint256 _area,
        string memory _policyFor,
        string memory _location
    ) external payable {
        require(msg.value >= 0.001 ether, "Premium must be at least 0.001 ETH");

        policies[msg.sender] = Policy({
            policyHolder: msg.sender,
            cropType: _cropType,
            area: _area,
            policyFor: _policyFor,
            location: _location,
            premium: msg.value,
            active: true,
            eligibleForClaim: false
        });

        emit PolicyCreated(msg.sender, _cropType, _area, _policyFor, _location, msg.value);
    }

    // Function to check if a policy is eligible for a claim based on temperature and weather conditions
    function checkClaimEligibility(uint256 temperature, string memory weatherCondition) external {
        Policy storage policy = policies[msg.sender];
        require(policy.active, "Policy is not active");

        // Flood or Drought Conditions
        if ((temperature < 20 && keccak256(abi.encodePacked(weatherCondition)) == keccak256("rain")) ||
            temperature > 40) {
            policy.eligibleForClaim = true;

            emit ClaimTriggered(msg.sender, block.timestamp, "Weather-based claim condition met");
        }
    }

    // Function to retrieve the claim eligibility status of a policy holder
    function isEligibleForClaim(address _policyHolder) external view returns (bool) {
        return policies[_policyHolder].eligibleForClaim;
    }

    // Function to check if a policy is active for a policy holder
    function isPolicyActive(address _policyHolder) external view returns (bool) {
        return policies[_policyHolder].active;
    }

    // Function to get policy details for a policy holder
    function getPolicyDetails(address _policyHolder)
        external
        view
        returns (
            string memory cropType,
            uint256 area,
            string memory policyFor,
            string memory location,
            uint256 premium,
            bool active,
            bool eligibleForClaim
        )
    {
        Policy storage policy = policies[_policyHolder];
        return (
            policy.cropType,
            policy.area,
            policy.policyFor,
            policy.location,
            policy.premium,
            policy.active,
            policy.eligibleForClaim
        );
    }
}
