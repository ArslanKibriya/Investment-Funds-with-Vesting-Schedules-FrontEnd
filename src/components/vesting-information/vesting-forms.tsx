import { FContainer, FGrid, FGridItem, FButton, FTypo } from 'ferrum-design-system';
import React, { useEffect, useRef, useState } from 'react';
import { FCard } from '../ferrum-design-system/Fcard/Fcard';
import { FDatepicker } from '../ferrum-design-system/Fform/Fdatepicker/Fdatepicker';
import { FInputCheckbox } from '../ferrum-design-system/Fform/FinputCheckbox/FinputCheckbox';
import { FInputRadio } from '../ferrum-design-system/Fform/FinputRadio/FinputRadio';
import { FInputText } from '../ferrum-design-system/Fform/FinputText/FinputText';
import { Web3Helper } from "../../web3-client-container/web3Helper";
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import Papa from 'papaparse';
import { ApprovalWalletDialog } from '../user-dashboard/ApprovalWalletDialog';
import { createPool, poolCreatedSuccessfully } from '../../_apis/vesting';
import toast, { Toaster } from "react-hot-toast";
import ReactTooltip from 'react-tooltip';
import { smartContractAddress, ferrumNetworkIdentifier } from '../../utils/const.utils';
import Web3 from "web3";
import { WalletConnector } from 'foundry';
import Big from 'big.js';

const VestingForm = () => {
    type txType = 'cliff' | 'approval' | '';
    const location: any = useLocation();
    const history = useHistory();
    const mainContractAddress = useSelector((state: RootState) => state.mainAppContract.mainContract);
    const userAuthToken = useSelector((state: RootState) => state.mainAppContract.userToken);
    const { isEditedForm } = location.state;
    const [titleRound, setTitleRound] = useState('');
    const [description, setDescription] = useState('');
    const [cliffPercentage, setCliffPercentage] = useState<any>();
    const [tokenAddress, setTokenAddress] = useState(mainContractAddress);
    const [totalVesting, setTotalVesting] = useState<any>(null);
    const [cliffPeriod, setCliffPeriod] = useState<Date>();
    const [cliffVestingDate, setCliffVestingDate] = useState<Date>();
    const [vestingDate, setVestingDate] = useState<Date>();
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [shortNameOfSelectedFile, setShortNameOfSelectedFile] = useState<any>(null);

    const [isCliff, setIsCliff] = useState(false);
    const [allowanceValue, setAllowanceValue] = useState(-1);
    const [isAllowanceValueProcessing, setIsAllowanceValueProcessing] = useState(false);
    const currentTime = new Date().getTime() / 1000.0;

    //for transition dialog
    const [transitionWalletDialog, setTransitionWalletDialog] = useState(false);
    const [isProcessing, setIsProcessing] = useState(true);
    const [isInProgress, setIsInProgress] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [isTransactionSuccessfull, setIsTransactionSuccessfull] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [isWalletApproved, setIsWalletApproved] = useState(false);

    // wallet connect
    const [isTxInSafe, setTxIsInSafe] = useState(false);
    const [ TxType, setTxType ] = useState<txType>('');
    const [poolId, setPoolId] = useState<any>('');
    const [txErrorMsg, setTxErrorMsg] = useState<any>('');
    const [safeTxId, setSafeTxId] = useState<any>('');
    //
    const hiddenFileInput: any = useRef(null);
    const { networkClient, currentWalletNetwork, currentWallet } = useSelector((state: RootState) => state.walletConnector);
    const walletAddress  =
    useSelector((state: RootState) => state.mainAppContract.accountWalletAddress);
    var signature = "";
    var key = "";

    const handleClick = (event: any) => {
        hiddenFileInput && hiddenFileInput.current && hiddenFileInput.current.click();
    };
    const handleChange = (event: any) => {
        const fileUploaded = event.target.files[0];
        setSelectedFile(fileUploaded);
    };
    const onSubmitSaveTxn = async (tx: string) => {
        if (tx) {
            setTransactionId((tx||'').trim());
            setTxIsInSafe(false)
            setIsInProgress(true);
            const web3Helper = new Web3Helper(networkClient as any);
            await web3Helper.checkTransaction(
                tx,
                (response: any) => TxType === 'cliff' ? executeCliff(isCliff, response, poolId, true) : 
                    TxType === 'approval' ? executeApproval() :
                    () => {},
                () => {
                    setTransitionWalletDialog(false); //transaction popup will close
                    setIsProcessing(false);
                },
                (msg: string) => {
                    setTxIsInSafe(true)
                    setTxErrorMsg(msg)
                }
            )
        }
    }
    const getPoolId = (isSafe: any, isCliff: any, response: any) => {
        console.log(smartContractAddress, isSafe, 'safeInfo');
        if (isSafe) {
            const getLog = response?.logs?.find((e: any) => {
                return (e.address.toString()) === (smartContractAddress || "") 
                || ( (e.address.toString().toLowerCase()) === (smartContractAddress ||"") );
            });
            if ( getLog ) {
                const poolId = Web3.utils.hexToNumberString((getLog.topics || [])[2])
                return poolId
            }
            const result =  (((response?.events || {})['CliffAddVesting']) || [])?.returnValues?.poolId 
            || (((response?.events || {})['AddVesting']) || [])?.returnValues?.poolId;

            return result || ""
        }else {
           const poolId  =  (isCliff ? 
                (response?.events['CliffAddVesting'] || [])?.returnValues?.poolId 
                : (response.events['AddVesting'] || []).returnValues?.poolId);
           return poolId
        }
    }

    const executeCliff = async (cliff:boolean, response: any, poolIdFromCreatePool: any, isSafe = false) => {

        const poolIdResult = getPoolId(isSafe, cliff, response) || poolId;
        console.log(poolIdResult, 'poolIdResultpoolIdResult')
        console.log(`Smart Contract response for ${cliff ? 'cliff' : 'simple'}`, response)
        await poolCreatedSuccessfully(poolIdFromCreatePool, poolIdResult, userAuthToken)
            .then((response: any) => {
                console.log('Pool Created Successfully')
            })
            .catch((e) => {
                console.log(e);
            });
        setIsInProgress(false);
        setIsProcessing(false);
        setIsTransactionSuccessfull(true);
    }

    const executeApproval = () => {
        console.log("execute approval");
        setTransitionWalletDialog(false);
        setIsProcessing(false);
        history.push({
            pathname: `/vesting/vesting-form/${mainContractAddress}`,
            search: `?smartContractAddress=${smartContractAddress}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`,
            state: {
                isEditedForm: false
            }
        })
    }
    // const CSVToArray = (file : any) => {}

    function etherToWei(ether: any) {
        try {
            var Web3 = require('web3');
            return Web3.utils.toWei(ether, 'ether');
        } catch (e: any) {
            console.log(e)
        }
    }
    function WeiToEther(wei: any) {
        var Web3 = require('web3');
        return Web3.utils.fromWei(String(wei), 'ether');

    }
    useEffect(() => {
        console.log('allowanceValue', allowanceValue)
        callAllowance()
    }, [allowanceValue])
    useEffect(() => {
        console.log('isWalletApproved', isWalletApproved)
    }, [isWalletApproved])
    useEffect(() => {
        if (selectedFile && selectedFile.name) {
            let short = selectedFile.name.replace(/(.{30})..+/, "$1…");;
            setShortNameOfSelectedFile(short)
        }
    }, [selectedFile])

    function callAllowance() {
        if (networkClient && allowanceValue === -1) {
            checkAllowance();
        } else if (allowanceValue && allowanceValue >= totalVesting) {
            setIsWalletApproved(true);
        }
    }

    async function checkAllowance() {
        try {
            setIsAllowanceValueProcessing(true)
            const web3Helper = new Web3Helper(networkClient as any);
            let response;
            response = await web3Helper.allowanceMethod(mainContractAddress, walletAddress);
            setIsAllowanceValueProcessing(false)
            if (!!response) {
                let allowedEtherValue = WeiToEther(response);
                setAllowanceValue(Number(allowedEtherValue));
            }
        } catch (e) {
            console.log(e)
            setIsAllowanceValueProcessing(false)
        }
    }
    async function checkApprovalOfWallet() {
        setTxType('approval')
        const web3Helper = new Web3Helper(networkClient as any);
        let response;
        const totalWeiVesting = etherToWei(String(totalVesting * 10));
        response = await web3Helper.approveMethod(mainContractAddress, walletAddress, totalWeiVesting, setTransitionWalletDialog, setIsProcessing,currentWallet, setIsInProgress ,setTxIsInSafe);
        if (!!response) {
            console.log('Response of Approval', response);
            executeApproval()

        }
    }
    function checkReadyForVesting() {

        if (allowanceValue === -1) {
            callAllowance()
            return
        }
        if (isWalletApproved) {
            if (!Number(totalVesting)) {
                toast.error('Invalid total vesting amount: Please enter Total Vesting amount in numbers without commas.');
                return
            }
        }

        if (allowanceValue && allowanceValue >= totalVesting) {
            checkValidations(false);
        } else {
            checkApprovalOfWallet();
        }

    }
    async function addVesting() {
        console.log('network', networkClient)
        if (networkClient) {
            let response;
            const web3Helper = new Web3Helper(networkClient as any);
            let vestingDateEpoch = new Date(`${vestingDate} UTC`).getTime() / 1000.0;


            //writing outside our if state just for our backend
            let nonCliffVestingEpoch: any;
            let cliffVestingDateEpoch: any;
            let cliffPeriodEpoch: any;
            if (isCliff) {//only for cliff
                cliffPeriodEpoch = new Date(`${cliffPeriod} UTC`).getTime() / 1000.0;

                if (isCliff) {
                    cliffVestingDateEpoch = new Date(`${cliffVestingDate} UTC`).getTime() / 1000.0;
                }


                if (vestingDateEpoch < cliffVestingDateEpoch || cliffPeriodEpoch > cliffVestingDateEpoch) {
                    toast.error('Please recheck your dates and times');
                    return;
                }
                if (cliffPeriodEpoch >= vestingDateEpoch)
                {
                    toast.error('Cliff (Lock) Period End Date & Time is greater than Vesting End Date & Time');
                    return; 
                }
                if (cliffVestingDateEpoch === null) {
                    cliffVestingDateEpoch = cliffPeriodEpoch + 1;
                }
                else {
                    cliffVestingDateEpoch = cliffPeriodEpoch + 60;
                }
                nonCliffVestingEpoch = (vestingDateEpoch - cliffVestingDateEpoch) + cliffPeriodEpoch;



            } else {
                //assigning these three current times because our backend request fails without them
                cliffPeriodEpoch = currentTime;
                cliffVestingDateEpoch = currentTime;
                nonCliffVestingEpoch = currentTime;
                setCliffPercentage(0);
                if (vestingDateEpoch < currentTime) {//if not cliff check is vesting date is greater than current date 
                    toast.error('Your vesting time should be greater than current time');
                    console.log('Heeloooooo', vestingDateEpoch, currentTime)
                    return;
                }
            }
            var userAddresses: any = [];
            var userAllocations: any = [];
            let sumBigNumber = new Big(0.0);
            var sum = 0;
            //for parsing the CSV file and then on its completion call the contract api
            Papa.parse(selectedFile, {
                download: true,
                step: function (row: any) {
                    userAddresses.push(row.data[0]);
                    let allocValue = etherToWei(row.data[1]);
                    let amount = new Big(row.data[1]);
                    sumBigNumber = sumBigNumber.plus(amount);
                    sum = Number(sumBigNumber.toFixed());    /// calculate the value of csv
                    console.log(sum)
                    userAllocations.push(allocValue);
                },
                complete: function () {
                    let type = "simple"
                    if (isCliff) {
                        type = "cliff"
                    }
                    if (sum == totalVesting) {
                        setTransitionWalletDialog(true); //transaction popup will open
                        setIsProcessing(true);
                        createPool(titleRound, description, vestingDateEpoch, cliffVestingDateEpoch, cliffPeriodEpoch, nonCliffVestingEpoch, tokenAddress, cliffPercentage, userAddresses, userAllocations, 'FRM', currentWalletNetwork, totalVesting, userAuthToken, type)
                            .then(async (data: any) => {
                                setTxType('cliff')
                                var poolIdFromCreatePool = data.data.body.pool._id;
                                setPoolId(poolIdFromCreatePool);
                                signature = data.data.body.pool.signatureData.signature;
                                key = data.data.body.pool.signatureData.key;
                                console.log(key, signature, isCliff);
                                //for cliff
                                if (isCliff) {
                                    response = await web3Helper.addCliffVesting(titleRound, vestingDateEpoch, tokenAddress, cliffPeriodEpoch, cliffPercentage, cliffVestingDateEpoch, userAddresses, userAllocations, signature, key, walletAddress, setIsProcessing, setIsInProgress, setTransactionId, poolIdFromCreatePool, userAuthToken, setTransitionWalletDialog,currentWallet,setTxIsInSafe);
                                    if (!!response) {
                                        await executeCliff(isCliff, response, poolIdFromCreatePool, (currentWallet === 2) )
                                    }
                                } else {//for simple
                                    response = await web3Helper.addSimpleVesting(titleRound, vestingDateEpoch, tokenAddress, userAddresses, userAllocations, signature, key, walletAddress, setIsProcessing, setIsInProgress, setTransactionId, poolIdFromCreatePool, userAuthToken, setTransitionWalletDialog, currentWallet,setTxIsInSafe);
                                    if (!!response) {
                                        await executeCliff(isCliff, response, poolIdFromCreatePool, (currentWallet === 2) )
                                    }
                                }
                            })
                            .catch((e) => {
                                setTransitionWalletDialog(false); //transaction popup will close
                                setIsProcessing(false);
                                console.log(e);
                            });
                    } else {
                        toast.error('Your total allocations are not equal the allocations in csv.');
                    }
                }
            });
        } else {
            toast.error('Please connect your wallet again.');
        }
    }
    function onContinueToNextStepClick() {
        history.push({
            pathname: `/dashboard/${mainContractAddress}`,
            search: `?smartContractAddress=${smartContractAddress}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`
        });

    }
    function onTransactionContinue() {
        history.push({
            pathname: `/vesting/vesting-form/${mainContractAddress}`,
            search: `?smartContractAddress=${smartContractAddress}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`,
            state: {
                isEditedForm: false
            }
        })
    }
    function checkValidations(isOnlyForValidation: boolean) {

        if (titleRound !== '' && description !== '' && vestingDate && selectedFile) {
            if (isCliff && cliffPeriod && cliffPercentage >= 0 || cliffVestingDate) {
                if (!isOnlyForValidation) {
                    addVesting();
                } else {
                    return true;
                }
            } else if (!isCliff) {
                if (!isOnlyForValidation) {
                    addVesting();
                } else {
                    return true;
                }
            }

            else if (!cliffPercentage) {
                toast.error('Your data related to Cliff (Lock) Percentage is missing');
                return false;
            }
            else if (!cliffPeriod) {
                toast.error('Your data related to Cliff (Lock) Period End Date & Time is missing');
                return false;
            }
        }
        if (titleRound === '') {
            toast.error('Your data related to Round title is missing');
            return false;
        } else if (description === '') {
            toast.error('Your data related to Vesting Description is missing');
            return false;
        } else if (!vestingDate) {
            toast.error('Your data related to Vesting End Date & Time is missing');
            return false;
        }
        else if (!selectedFile) {
            toast.error('Your data related to (Upload CSV) is missing');
            return false;
        }
    }
    const downloadFile = function () {

        // Creating a Blob for having a csv file format
        // and passing the data with type
        const blob = new Blob([selectedFile], { type: 'text/csv' });

        // Creating an object for downloading url
        const url = window.URL.createObjectURL(blob)

        // Creating an anchor(a) tag of HTML
        const a = document.createElement('a')

        // Passing the blob downloading url
        a.setAttribute('href', url)

        // Setting the anchor tag attribute for downloading
        // and passing the download file name
        a.setAttribute('download', 'Sample.csv');

        // Performing a download with click
        a.click()
    }

    const checkIfNumber = (e: any) => {
        setIsCliff(e.target.value)
    }

    const handleCliff = (e: any) => {
        setIsCliff(e.target.value)
    }
    const handleIsnotCliff = (e: any) => {
        setIsCliff(e.target.value && !isCliff)
    }
    const removeOrOpenSampleUrl = () => {
        if (selectedFile) {
            if (hiddenFileInput && hiddenFileInput.current) {
                hiddenFileInput.current.value = ''
            }
            setSelectedFile(null)
            setShortNameOfSelectedFile(null)
            return
        }
        window.open("https://docs.google.com/spreadsheets/d/1ZLEzTLY_0sQ_0uQ1hWRV7ddgrsRPtYk3y3N7cqWNKwg/edit#gid=690340236");
    }

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <FContainer type="fluid">
                <FContainer>
                    <FCard variant={'whiteLabeled'}>
                        <form autoComplete="off">
                            <FGrid>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1"}>
                                    <ReactTooltip place='right' type='dark' effect='float' />
                                    <a className=' f-input-group tooltip text' data-tip='This is the public pool / round name displayed to user for this vesting pool'>Round Title</a>
                                    <FInputText
                                        variant="whiteLabeled"
                                        // label="Round Title"
                                        name="TitleRound"
                                        placeholder="Title Vesting Round"
                                        value={titleRound}
                                        onChange={((e: any) => { setTitleRound(e.target.value) })}
                                    />
                                </FGridItem>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1"}>
                                    <ReactTooltip place='right' effect='float' type='dark' />
                                    <a className=' f-input-group  tooltip ' data-tip='Provide simple text explanation of your vesting terms'>Vesting Description</a>

                                    <FInputText
                                        variant="whiteLabeled"
                                        // label="Vesting Description"
                                        name="Vesting"
                                        placeholder="Example: 10% at TGE, 1 month cliff + 7 months linear"
                                        value={description}
                                        onChange={((e: any) => { setDescription(e.target.value) })}
                                    />
                                </FGridItem>
                            </FGrid>
                            <FGrid>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1"}>
                                    <label className={`f-input-label w-100 f-mt-1`}>
                                        Token Address
                                    </label>
                                    <div className={'custom_input_wrap d_flex justify_start align_center custom-padding-10 f-mt--8 tokenaddress'}>
                                        {tokenAddress}
                                    </div>
                                </FGridItem>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1 "}>
                                    <ReactTooltip place='right' effect='float' type='dark' />
                                    <label className=' f-input-group  tooltip padding' data-tip='This is the Total number of tokens vesting in this pool / Round'>Total Allocation / Vesting</label>

                                    <FInputText
                                        variant="whiteLabeled"
                                        // label="Total Allocation / Vesting"
                                        name="Vesting"
                                        placeholder="Total Vesting"
                                        value={totalVesting}
                                        onChange={((e: any) => { setTotalVesting(e.target.value) })}
                                    />
                                </FGridItem>
                            </FGrid>
                            <FGrid>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-2"}>
                                    <ReactTooltip place='right' effect='float' type='dark' />
                                    <label className=' f-input-group  tooltip' data-tip='This is the Date & time Time when all tokens are vested'>Vesting End Date & Time (UTC)</label>

                                    <FDatepicker
                                        value={vestingDate}
                                        placeholderText={"MM/DD/YYYY hh:mm"}
                                        showTimeSelect={true}
                                        variant="whiteLabeled"
                                        // label={"Vesting Date Time"}
                                        name={"vDate"}
                                        selected={vestingDate}
                                        onChange={(date: Date) => setVestingDate(date)}
                                    />
                                </FGridItem>
                                <FGridItem alignX="center" size={[6, 12, 12]}>
                                    <ReactTooltip place='right' effect='float' type='dark' />
                                    <label className=' f-input-group  f-mt-1' data-tip='This is the sampler sheet'>Recipient address & allocation list (Upload CSV)</label>

                                    <div className={'custom_input_wrap d_flex justify_between custom-padding-10 f-mt--8 align_center tokenaddress'}>
                                        <p> {selectedFile ? shortNameOfSelectedFile : 'sample.csv'} </p>
                                        {/* <p> 'sample.csv'</p> */}
                                        <div className='d_flex justify_center align_center cursor-pointer'>
                                            <div
                                                className='sample'
                                                onClick={removeOrOpenSampleUrl}>
                                                <p>{selectedFile ? 'Remove' : 'Sample'}</p>
                                            </div>
                                            <div
                                                className={'csvBtn align_center d_flex justify_center'}
                                                onClick={handleClick}>
                                                <p>Choose File</p>
                                            </div>

                                        </div>
                                    </div>



                                </FGridItem>
                            </FGrid>

                            <FGrid className={'f-mt-1'}>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1 "}>
                                    <ReactTooltip place='right' type='dark' effect='float' />
                                    <label className=' f-input-group  tooltip' data-tip='By setting cliff (Lock) Period you can set a percentage of tokens to be locked for a specified duration'>Would you like to add a Cliff (Lock) Period?</label>

                                    <div className={'w-100 f-mb-1 '} >
                                        <label>
                                            <input type="radio"
                                                name="isCliff"
                                                value="Yes"
                                                onChange={handleCliff} />
                                            Yes
                                        </label>
                                        <label >
                                            <input type="radio"
                                                name="isCliff"
                                                value=""
                                                onChange={handleIsnotCliff} defaultChecked />

                                            No
                                        </label>
                                    </div>
                                </FGridItem>
                            </FGrid>
                            <FGrid>
                                <FGridItem alignX="center" size={[6, 12, 12]} className="f-mt-1 ">
                                    {isCliff &&
                                        <><ReactTooltip place='right' type='dark' effect='float' /><label className=' f-input-group  tooltip' data-tip='This is the % of total tokens that will be allocated through a cliff (Lock)period'>Cliff (Lock) Percentage</label><FInputText
                                            variant="whiteLabeled"
                                            // label="Cliff Percentage"
                                            name="cliffPercentage"
                                            placeholder="Cliff Percentage"
                                            value={cliffPercentage}
                                            onChange={((e: any) => { setCliffPercentage(e.target.value); })} /></>
                                    }
                                </FGridItem>
                                <FGridItem alignX="center" size={[6, 12, 12]} className="f-input-group " >
                                    {isCliff &&
                                        <><ReactTooltip place='right' type='dark' effect='float' />
                                            <label className=' f-input-group f-mt-1 ' data-tip='During this period all tokens are locked and no vesting occurs'>Cliff (Lock) Period End Date & Time</label>

                                            <FDatepicker
                                                className={"f-mt-1"}
                                                placeholderText={"MM/DD/YYYY hh:mm"}
                                                value={cliffPeriod}
                                                showTimeSelect={true}
                                                variant="whiteLabeled"
                                                // label={"Cliff Period"}
                                                name={"cPeriod"}
                                                selected={cliffPeriod}
                                                onChange={(date: Date) => setCliffPeriod(date)} /></>
                                    }
                                </FGridItem>
                            </FGrid>

                            <FGrid>
                                <FGridItem alignX="center" size={[6, 12, 12]} className="f-mt-1">
                                    {isCliff &&
                                        <><ReactTooltip place='right' type='dark' effect='float' /><label className=' f-input-group  tooltip ' data-tip='This is an optional field that enables you to release cliff (locked) tokens through there own vesting instead of releasing them in a large chunk'> Cliff Vesting End Date & Time</label><FDatepicker
                                            placeholderText={"MM/DD/YYYY hh:mm"}
                                            value={cliffVestingDate}
                                            showTimeSelect={true}
                                            variant="whiteLabeled"
                                            // label={"Cliff Vesting Date Time"}
                                            name={"cVDate"}
                                            selected={cliffVestingDate}
                                            onChange={(date: Date) => setCliffVestingDate(date)} /></>
                                    }
                                </FGridItem>

                                <FGridItem alignX="end" dir={"row"} className={"f-mt-3"}>
                                    <FButton
                                        variant={'whiteLabeled'}
                                        className={`border-radius-8 ${isWalletApproved && 'bg_purple'}`}
                                        style={{ width: '201px', height: '40px' }}
                                        title={`${isAllowanceValueProcessing ? 'Processing...' : isWalletApproved && isCliff ? 'Add Cliff Vesting' : isWalletApproved && !isCliff ? 'Add Vesting' : 'Approve'}`}
                                        onClick={() => {
                                            // downloadFile();
                                            if (!isAllowanceValueProcessing) {
                                                // if (isWalletApproved) {
                                                //     // addVesting();
                                                //     // checkValidations();

                                                // } else if (isEditedForm) {
                                                //     //after the functionality of edit
                                                // } else {
                                                checkReadyForVesting();
                                                // }
                                            }
                                        }}
                                    />

                                </FGridItem>
                            </FGrid>
                        </form>
                    </FCard>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        ref={hiddenFileInput}
                        onChange={handleChange} />

                    <ApprovalWalletDialog
                        transitionStatusDialog={transitionWalletDialog}
                        setTransitionStatusDialog={setTransitionWalletDialog}
                        isProcessing={isProcessing}
                        isInProgress={isInProgress}
                        transactionId={transactionId}
                        isApproved={isApproved}
                        isTransactionSuccessfull={isTransactionSuccessfull}
                        onContinueToNextStepClick={() => onContinueToNextStepClick()}
                        onContinueTransaction={onTransactionContinue}
                        isInSafe={isTxInSafe}
                        txError={txErrorMsg}
                        onSubmitSaveTxn={onSubmitSaveTxn}
                    />
                </FContainer>
            </FContainer>
        </>
    )
}

export default VestingForm;
function type(titleRound: string, description: string, vestingDateEpoch: number, cliffVestingDateEpoch: any, cliffPeriodEpoch: any, nonCliffVestingEpoch: any, tokenAddress: string, cliffPercentage: any, userAddresses: any, userAllocations: any, arg10: string, currentWalletNetwork: number, totalVesting: any, userAuthToken: string, type: any) {
    throw new Error('Function not implemented.');
}

