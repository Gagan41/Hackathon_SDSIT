// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsurancePolicy {
    struct Policy {
        address user;           // Address of the user purchasing the policy
        string crop;            // Type of crop
        uint coverageAmount;    // Coverage amount in some base unit
        uint startDate;         // Policy start date in Unix timestamp
        uint endDate;           // Policy end date in Unix timestamp
        uint payoutAmount;      // Payout amount if claim is triggered
        bool active;            // Status of the policy (true = active, false = claimed)
        bool claimed;           // Indicates if the policy has been claimed
    }

    Policy[] public policies;
    mapping(address => uint[]) public userPolicies;  // Maps user addresses to their policy IDs

    // Event emitted when a policy is created
    event PolicyCreated(uint policyId, address indexed user, uint coverageAmount, uint startDate, uint endDate);

    // Event emitted when a payout is triggered
    event PayoutTriggered(uint policyId, address indexed user, uint payoutAmount);

    // Create a new policy for the given user
    function createPolicy(string memory _crop, uint _coverageAmount, uint _startDate, uint _endDate, uint _payoutAmount) public {
        require(_coverageAmount > 0, "Coverage amount must be greater than zero");
        require(_startDate < _endDate, "End date must be after start date");

        Policy memory newPolicy = Policy({
            user: msg.sender,
            crop: _crop,
            coverageAmount: _coverageAmount,
            startDate: _startDate,
            endDate: _endDate,
            payoutAmount: _payoutAmount,
            active: true,
            claimed: false
        });

        policies.push(newPolicy);
        uint policyId = policies.length - 1;
        userPolicies[msg.sender].push(policyId);

        emit PolicyCreated(policyId, msg.sender, _coverageAmount, _startDate, _endDate);
    }

    // Modifier to check if the caller is the policy owner
    modifier onlyPolicyOwner(uint _policyId) {
        require(policies[_policyId].user == msg.sender, "Only the policy owner can trigger this action");
        _;
    }

    // Function to claim a policy by triggering the payout if conditions are met
    function triggerPayout(uint _policyId) public onlyPolicyOwner(_policyId) {
        require(_policyId < policies.length, "Policy does not exist");
        Policy storage policy = policies[_policyId];

        require(policy.active, "Policy is not active");
        require(!policy.claimed, "Policy has already been claimed");

        policy.active = false;
        policy.claimed = true;

        emit PayoutTriggered(_policyId, msg.sender, policy.payoutAmount);
    }

    // Retrieve all policies for a specific user
    function getUserPolicies(address _user) public view returns (uint[] memory) {
        return userPolicies[_user];
    }

    // Retrieve details of a specific policy by its ID
    function getPolicy(uint _policyId) public view returns (
        address user, string memory crop, uint coverageAmount, uint startDate, uint endDate, uint payoutAmount, bool active, bool claimed
    ) {
        require(_policyId < policies.length, "Policy does not exist");
        Policy storage policy = policies[_policyId];

        return (
            policy.user,
            policy.crop,
            policy.coverageAmount,
            policy.startDate,
            policy.endDate,
            policy.payoutAmount,
            policy.active,
            policy.claimed
        );
    }
}
