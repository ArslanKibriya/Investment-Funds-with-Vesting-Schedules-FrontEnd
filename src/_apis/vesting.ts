import axios from "axios";
import { TypeFormatFlags } from "typescript";
import { defaultEndPointDetails } from "../utils/const.utils";
import { smartContractAddress } from "../utils/const.utils";
export function signInUser(tokenAddress: any) {
    return axios.post(`${defaultEndPointDetails}/api/v1/admin/users/sign-in/`, {
        address: tokenAddress,
    });
}

export function createPool(poolName: any, description: any, vestingTime: any, cliffVestingTime: any, cliffPeriodTime: any, nonCliffVestingTime: any, tokenAddress: any, cliffPercentage: any, usersAdresses: any, usersAllocations: any, organizationIdentifier: any, chainId: any, totalVesting: any, userAuthToken: any, type: any) {
    return axios.post(`${defaultEndPointDetails}/api/v1/admin/pools/create`, {
        name: poolName,
        description: description,
        vestingTimestamp: vestingTime,
        cliffVestingTimestamp: cliffVestingTime,
        cliffPeriodTimestamp: cliffPeriodTime,
        nonCliffVestingTimestamp: nonCliffVestingTime,
        tokenContractAddress: tokenAddress,
        cliffPercentage: cliffPercentage,
        usersAdresses: usersAdresses,
        usersAllocations: usersAllocations,
        organizationIdentifier: organizationIdentifier,
        chainId: chainId,
        totalAllocation: totalVesting,
        type: type,
        smartTokenContractAddress: smartContractAddress,
    }, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${userAuthToken}`,
        }
    });
}

export function poolCreatedSuccessfully(id: any, poolId: any, token: any) {
    return axios.put(`${defaultEndPointDetails}/api/v1/admin/pools/update/status/to/complete/${id}`, { poolId: poolId }, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}
export function poolCreatedFailed(id: any, token: any) {
    return axios.put(`${defaultEndPointDetails}/api/v1/admin/pools/update/status/to/failed/${id}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}
export function getTotalAllocationAdmin(tokenAddress: any, token: any) {
    return axios.get(`${defaultEndPointDetails}/api/v1/admin/pools/total/contract/allocation/${smartContractAddress}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}
export function getAllAdminPools(status: any, tokenContractAddress: any, offset: any, limit: any, token: any) {
    return axios.get(`${defaultEndPointDetails}/api/v1/admin/pools/list`, {
        params: {
            status,
            smartTokenContractAddress: smartContractAddress,
            offset,
            limit
        }, headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${token}`,
        },
    })
}
export function getAllUserPools(status: any, statusNotEqual: any, organizationIdentifier: any, userAdress: any, tokenContractAddress: any, offset: any, limit: any) {
    return axios.get(`${defaultEndPointDetails}/api/v1/pools/list`, {
        params: {
            status,
            statusNotEqual,
            organizationIdentifier,
            smartTokenContractAddress: smartContractAddress,
            tokenContractAddress: tokenContractAddress,
            userAdress,
            offset,
            limit
        },
    })
}
export function getAllNetworksAllowedOnVesting(ferrumNetworkIdentifier: any, offset: any, limit: any) {
    return axios.get(`${defaultEndPointDetails}/api/v1/networks/list`, {
        params: {
            ferrumNetworkIdentifier: ferrumNetworkIdentifier,
            offset,
            limit
        }, headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json"
        },
    })
}