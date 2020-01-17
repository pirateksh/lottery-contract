import Web3 from 'web3';

// Code added to get permission from MetaMask
// Not in original video tutorial
window.addEventListener('load', async () => {
	if(window.ethereum){
		window.web3 = new Web3(window.ethereum);
		try{
			await window.ethereum.enable();
		} catch (err) {

		}
	}
});
// Extra code ended

const web3 = new Web3(window.web3.currentProvider);

export default web3;