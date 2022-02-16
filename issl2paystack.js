function issl2paystack(amt, paystack_key, userEmail, userPhone, reference) {
	var atm = parseFloat(amt);
	console.log("Amount:: "+atm);
	var amount = atm/100;
	console.log("Amount:: "+amount);
	var tempDate = new Date();
	var valueDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1)
		+ '-' + tempDate.getDate() + 'T' + tempDate.getHours() + ':'
		+ tempDate.getMinutes() + ':' + tempDate.getSeconds() + 'Z';
	var handler = PaystackPop.setup({
		key: paystack_key,
		email: userEmail,
		amount: atm,
		currency: 'NGN',
		ref: reference,
		channel: ['card'],
		metadata: {
			custom_fields: [{
				display_name: 'Mobile Number',
				variable_name: 'mobile_number',
				value: userPhone
			}]
		},
		callback: function (response) {
			//const formData = {
			//	'amount': amount,
			//	'fromAccountNo': settlement_account,
			//	'narrative': 'Customer account e-TopUp with reference:' + response.reference,
			//	'reference': response.reference,
			//	'toAccountNo': toaccount,
			//	'user': {
			//		'fullName': usrFullname,
			//		'ipAddress': usrIPAddress,
			//		'screenName': screenName
			//	},
			//	'valueDate': valueDate
			//}
			console.log(response.message+"-"+response.reference);
			//alert(response.message+"-"+response.reference);
			com.isslng.paystack.pmtcompletelistener(response);
			//
		},
		onClose: function () {
			console.log("window closed:");
		    com.isslng.paystack.paymentfailed(reference);
			alert('window closed');
			
		}
	});
	handler.openIframe();
}
