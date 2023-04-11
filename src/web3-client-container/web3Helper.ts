import Web3 from "web3";
import IronVestJson from '../utils/IronVest.json'
import ApproveRouterJson from '../utils/ApproveRouterAbi.json'
import { AbiItem } from "web3-utils";
import { poolCreatedFailed } from "../_apis/vesting";
import { smartContractAddress } from "../utils/const.utils";

export class Web3Helper {
    web3Client: Web3;
    static addSimpleVesting: any;
    constructor(web3: Web3) {
        this.web3Client = web3;
    }
    async checkTransaction(hash: string, callback: any, close: any, failed: any) {
        console.log(hash, 'hash');
        try {
            const response = await this.web3Client.eth.getTransactionReceipt(hash, function (err, rec) {
                return rec;
            });

            if (response) {
                console.log(response, 'response');
                if (response.status) {
                    setTimeout(() => "checking progress", 500)
                    callback(response)
                    return true;
                }
                console.log('transaction failed');
                close()
                return false;
            } else {
                setTimeout(() => this.checkTransaction(hash, callback, close, failed), 50000);
            }
        } catch (e) {
            console.log(e)
            //@ts-ignore
            failed(`Transaction error occured : ${e?.message || 'invalid Transaction Id provided'}`)
        }
    }

    async addCliffVesting(poolName: any, vestingTime: any, tokenAddress: any, cliffPeriod: any, cliffPercentage: number, cliffVestingTime: any, userAddresses: any, userAllocation: any, signature: any, key: any, walletAddress: any, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolId: any, userAuthToken: any, setTransitionWalletDialog: any ,currentWallet: any, setIsSafeTransaction: any) {
        try {
            // our contract taking percentages in 10000 that why we are multiplying with 100
            var percentage = cliffPercentage * 100;
            // console.log("hello percentage", percentage);
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.addCliffVesting(
                poolName, vestingTime, cliffVestingTime, cliffPeriod, tokenAddress, percentage, userAddresses, userAllocation, signature, key
            ).send({ from: walletAddress }, function (error: any, transactionHash: any) { })
            .on('sent', async () => {
                if (currentWallet === 2) {
                    setTimeout(() => { }, 1000)
                    setIsSafeTransaction(true);
                    setIsInProgress(true);
                }
            }).on('transactionHash', function (transactionHash: any) {
                console.log('Transaction Hash', transactionHash);
                if (currentWallet != 2) {
                    setTransactionId(transactionHash);
                    setIsProcessing(false);
                    setIsInProgress(true);
                }
                setTransactionId(transactionHash || '');
            });
        console.log('Transaction response', response);

        return response;
    } catch (e) {
        setIsProcessing(false);
        setIsInProgress(false);
        setTransitionWalletDialog(false);
        poolCreatedFailed(poolId, userAuthToken)
            .then((response: any) => {
                console.log('Pool Creation Failed')
            })
            .catch((e) => {
                console.log(e);
            });
        console.log(e);
    }
}
    async addSimpleVesting(poolName: any, vestingTime: any, tokenAddress: any, userAddresses: any, userAllocation: any, signature: any, key: any, walletAddress: any, setIsProcessing: any, setIsInProgress: any, setTransactionId: any, poolId: any, userAuthToken: any, setTransitionWalletDialog: any, currentWallet: any, setIsSafeTransaction: any) {
        try {
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.addVesting(
                poolName, vestingTime, tokenAddress, userAddresses, userAllocation, signature, key
            ).send({ from: walletAddress }, function (error: any, transactionHash: any) { })
            .on('sent', async () => {
                if (currentWallet === 2) {
                    setTimeout(() => { }, 1000)
                    setIsSafeTransaction(true);
                    setIsInProgress(true);
                }
            }).on('transactionHash', async function (transactionHash: any) {
                if (currentWallet != 2) {
                    setTransactionId(transactionHash);
                    setIsProcessing(false);
                    setIsInProgress(true);
                }
                setTransactionId(transactionHash || '');
            });
        console.log('Transaction response simple vesting', response);
        return response;
    } catch (e) {
        setIsProcessing(false);
        setIsInProgress(false);
        setTransitionWalletDialog(false);
        poolCreatedFailed(poolId, userAuthToken)
            .then((response: any) => {
                console.log('Pool Creation Failed simple vesting')
            })
            .catch((e) => {
                console.log(e);
            });
        console.log(e);
    }
}

    async allowanceMethod(vestingContractAddress: any, userWalletAddress: any) {
        try {
            const stateVariable = new this.web3Client.eth.Contract(ApproveRouterJson.abi as AbiItem[],
                vestingContractAddress
            );
            const response = await stateVariable.methods.allowance(userWalletAddress, smartContractAddress).call();
            return response;
        } catch (e) {
            console.log(e);
        }
    }
    async symbolMethod(vestingContractAddress: any) {
        try {
            const stateVariable = new this.web3Client.eth.Contract(ApproveRouterJson.abi as AbiItem[],
                vestingContractAddress
            );
            const response = await stateVariable.methods.symbol().call();
            return response;
        } catch (e) {
            console.log(e);
        }
    }
    async approveMethod(vestingContractAddress: any, walletAddress: any, totalVesting: any, setTransitionWalletDialog: any, setIsProcessing: any, currentWallet: any, setIsInProgress: any, setIsSafeTransaction: any) {
        try {
            let fixedAllocation =  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
            setTransitionWalletDialog(true);
            setIsProcessing(true);
            const stateVariable = new this.web3Client.eth.Contract(ApproveRouterJson.abi as AbiItem[],
                vestingContractAddress
            );
            const response = await stateVariable.methods.approve(smartContractAddress, fixedAllocation).send({ from: walletAddress })
            .on('sent', async () => {
                if (currentWallet === 2) {
                    setTimeout(() => { }, 1000)
                    setIsSafeTransaction(true);
                    setIsInProgress(true);
                }
            });
            console.log('Approve in Web3', response)
            return response;
        } catch (e) {
            setTransitionWalletDialog(false);
            setIsProcessing(false);
            console.log(e);
        }
    }

    async cliffClaimable(poolId: any, userWalletAddress: any) { //same extra -> claimable
        try {
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.cliffClaimable(poolId, userWalletAddress).call();
            return response;
        } catch (e) {
            console.log(e);
        }
    }
    async simpleClaimable(poolId: any, userWalletAddress: any) {
        try {
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.claimable(poolId, userWalletAddress).call();

            return response;
        } catch (e) {
            console.log(e);
        }
    }
    async nonCliffClaimable(poolId: any, userWalletAddress: any) { //same
        try {
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.nonCliffClaimable(poolId, userWalletAddress).call();
            return response;
        } catch (e) {
            console.log(e);
        }
    }
    async userCliffInfo(poolId: any, userWalletAddress: any) {
        try {
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.userCliffInfo(poolId, userWalletAddress).call();
            return response;
        } catch (e) {
            console.log(e);
        }
    }
    async userSimpleInfo(poolId: any, userWalletAddress: any) { // userInfo
        try {
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.userInfo(poolId, userWalletAddress).call();
            return response;
        } catch (e) {
            console.log(e);
        }
    }
    async userNonCliffInfo(poolId: any, userWalletAddress: any) {
        try {
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.userNonCliffInfo(poolId, userWalletAddress).call();
            return response;
        } catch (e) {
            console.log(e);
        }
    }
    async claimCliffTokens(poolId: any, walletAddress: any, setTransactionId: any, setTransitionWalletDialog: any, setIsProcessing: any, setIsInProgress: any,currentWallet: any, isSafe: any, setIsSafeTransaction: any) {
        try {
            setTransitionWalletDialog(true);
            setIsProcessing(true);
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.claimCliff(poolId).send({ from: walletAddress }, function (error: any, transactionHash: any) { })
            .on('sent', async () => {
                if (isSafe) {
                    setTimeout(() => { }, 1000)
                    setIsSafeTransaction(true);
                    setIsProcessing(true);
                }
            })   
            .on('transactionHash', function (transactionHash: any) {
                   if(!isSafe) {
                    setTransactionId(transactionHash);
                    setIsProcessing(false);
                    setIsInProgress(true);
                   }
                });
            console.log('Claim tokens ', response)
            return response;
        } catch (e) {
            setTransitionWalletDialog(false);
            setIsProcessing(false);
            console.log(e);
        }
    }
    async claimNonCliffTokens(poolId: any, walletAddress: any, setTransactionId: any, setTransitionWalletDialog: any, setIsProcessing: any, setIsInProgress: any, currentWallet: any, isSafe: any, setIsSafeTransaction: any) {
        try {
            setTransitionWalletDialog(true);
            setIsProcessing(true);
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.claimNonCliff(poolId).send({ from: walletAddress }, function (error: any, transactionHash: any) { })
            .on('sent', async () => {
                if (isSafe) {
                    setTimeout(() => { }, 1000)
                    setIsSafeTransaction(true);
                    setIsProcessing(true);
                }
            })
            .on('transactionHash', function (transactionHash: any) {
                if (!isSafe) {
                    setTransactionId(transactionHash);
                    setIsProcessing(false);
                    setIsInProgress(true);
                }
            });
            console.log('Claim non cliff tokens', response)
            return response;
        } catch (e) {
            setTransitionWalletDialog(false);
            setIsProcessing(false);
            console.log(e);
        }
    }

    async claimVestingTokens(poolId: any, walletAddress: any, setTransactionId: any, setTransitionWalletDialog: any, setIsProcessing: any, setIsInProgress: any, isSafe: any, setIsSafeTransaction: any) {
        try {
            setTransitionWalletDialog(true);
            const stateVariable = new this.web3Client.eth.Contract(IronVestJson.abi as AbiItem[],
                smartContractAddress
            );
            const response = await stateVariable.methods.claim(poolId).send({ from: walletAddress }, function (error: any, transactionHash: any) { })
            .on('sent', async () => {
                if (isSafe) {
                    setTimeout(() => { }, 1000)
                    setIsSafeTransaction(true);
                    setIsProcessing(true);
                }
            })
            .on('transactionHash', function (transactionHash: any) {
                if (!isSafe) {
                    setTransactionId(transactionHash);
                    setIsProcessing(false);
                    setIsInProgress(true);
                }
            });
            console.log('Claim vesting tokens', response)
            return response;
        } catch (e) {
            setTransitionWalletDialog(false);
            setIsProcessing(false);
            console.log(e);
        }
    }

}
export default Web3Helper


