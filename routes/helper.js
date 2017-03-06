var h = {}

h.filterAllowedParams = function(body, allowedParams) {

	for(k in body) {
		if (allowedParams.indexOf(k) === -1) {
			delete body[k];			
		} 
	} 
		return body;
}
module.exports = h;