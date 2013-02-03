
function assert(constraint, element, errorMessage) {
	if (constraint)
		return true;

	var parent = element.parent();
	var errors = parent.find('.errors');
	// if no previous errors for the element, add this
	if (!errors || errors.length == 0)
	parent.append('<ul class="errors"><li>' + errorMessage + '</li></ul>');
	return false;
}

function isLetter(ch) {
	return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

/**
 * Basic validators
 */

function validateBetween(input, min, max) {
	var val = parseFloat(input.val());
	return assert(
		min <= val && val <= max,
		input, 
		translate.value_between + min + translate.and + max + translate.inclusively
	);
}

function validateCharacters(input) {
	var pattern = /^[a-zA-Z0-9._]*$/;
	return assert(
		pattern.test(input.val()),
		input, 
		translate.valid_chars
	);
}

function validateEmail(input) {
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return assert(
		emailPattern.test(input.val()),
		input,
		translate.invalid_email
	);
}

function validateLength(input, minLength, maxLength) {
	if (!minLength) {
		minLength = 1;
	}
	if (!maxLength) {
		maxLength = 32768;
	}
	var len = input.val().replace(/(^[\s\xA0]+|[\s\xA0]+$)/g, '').length;
	return assert(len > 0, input, translate.empty_field) &&
		assert(len >= minLength, input, translate.at_least + minLength + translate.characters) &&
		assert(len <= maxLength, input, translate.at_most + maxLength + translate.characters);
}

function validateNumeric(input) {
	return assert(
		input.val().match(/^[-+]?[0-9]*\.?[0-9]+$/),
		input,
		translate.numerical_values
	);
}

function validatePasswordMatch(password, confirm) {
	return assert(
		password.val() == confirm.val(), 
		confirm, 
		translate.not_match
	);
}

function validateUsername(input) {
	var str = input.val();
	return assert(
		str.length > 0 && isLetter(str[0]) && isLetter(str[str.length-1]),
		input, 
		translate.username_cond
	);	
}

/**
 * Composite validators for each form 
 */
function validateAddProject(form) {
	var result = true;
	result &= validateLength(form.find("#title"), 6, 128);
	
	result &= validateLength(form.find("#value"));
	result &= validateNumeric(form.find("#value"));
	result &= validateBetween(form.find("#value"), 100, 2000000000);
	
	result &= validateLength(form.find("#requested_investment"));
	result &= validateNumeric(form.find("#requested_investment"));
	result &= validateBetween(form.find("#requested_investment"), 100, parseFloat(form.find("#value").val()));
	
	result &= validateLength(form.find("#current_stage"), 1);
	
//	result &= validateLength(form.find("#staff"));
//	result &= validateNumeric(form.find("#staff"));
//	result &= validateBetween(form.find("#staff"), 1, 100000);
//	result &= validateLength(form.find("#origin_of_funding"));
//	result &= validateLength(form.find("#proportion"));
//	result &= validateNumeric(form.find("#proportion"));
//	result &= validateLength(form.find("#client_name"));
	
	//result &= validateLength(form.find("#description"), 300, 4000);
	return result;	
}

function validateChangeLostPassword(form) {
	var result = true;
	result &= validateLength(form.find("#password"), 5, 32);
	result &= validatePasswordMatch(form.find("#password"), form.find("#password_confirm"));
	return result;
}

function validateCompanyProfile(form) {
	var result = true;
	result &= validateLength(form.find("#name"), 1);
	result &= validateLength(form.find("#city"), 1);
	result &= validateLength(form.find("#address"), 1);
	result &= validateLength(form.find("#phone"), 1);
	return result;
}

function validateCompanyRegister(form) {
	var result = true;
	result &= validateLength(form.find("#username"), 5, 32);
	result &= validateCharacters(form.find("#username"));
	result &= validateUsername(form.find("#username"));	
	result &= validateLength(form.find("#password"), 5, 32);
	result &= validateCharacters(form.find("#password"));
	result &= validatePasswordMatch(form.find("#password"), form.find("#password_confirm"));
	result &= validateLength(form.find("#name"), 2, 64);
	result &= validateLength(form.find("#email"), 1);
	result &= validateEmail(form.find("#email"));
	result &= validateLength(form.find("#city"), 1);
	result &= validateLength(form.find("#address"), 1);
	result &= validateLength(form.find("#phone"), 1);

	return result;
}

function validateGiveFeedback(form) {
	var result = true;
	result &= validateLength(form.find("#feedback"), 5, 4000);
	return result;
}

function validateNewMessage(form) {
	var result = true;
	if(form.find("#subject").length){
		console.log(form.find("#subject"));
		result &= validateLength(form.find("#subject"), 1);
	}
	return result;
}

// Factory for all forms
function validate(form) {
	// remove all previous errors
	form.find('.errors').remove();
	switch (form.attr('id')) {
		case 'addProjectForm':
			result = validateAddProject(form);
			break;
		case 'changeLostPasswordForm':
			result = validateChangeLostPassword(form);
			break;		
		case 'companyProfileForm':
			result = validateCompanyProfile(form);
			break;
		case 'companyRegisterForm':
			result = validateCompanyRegister(form);
			break;
		case 'giveFeedbackForm':
			result = validateGiveFeedback(form);
			break;
		case 'newMessageForm':
			result = validateNewMessage(form);
			break;
		default:
			result = true;
			break;
	}
	if (!result) {
		var err = form.find('.errors:first');
		if (err && err.offset()) {
			err.parent().find('input:first').focus();
			$('html, body').scrollTop(err.offset().top - 100);
		}
	}
	return result;
}
