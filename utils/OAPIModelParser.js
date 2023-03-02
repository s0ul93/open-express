
const { isJSON, isMultipartyFile } = require('./common');
const assert = require('assert');

let PrimitiveType = function(opts){
	assert.notEqual(opts, null);
	if (typeof opts === "string"){
		this.type = opts;
		this.required = false;
	} else {
		assert(isJSON(opts));	
		assert(typeof opts.type === 'string');	
		Object.assign(this, {required: false}, opts);
		assert (typeof this.required === 'boolean');
	}
	
	assert.equal( PrimitiveType.AcceptedList.includes(this.type), true );
	this.validate();
}

PrimitiveType.prototype.validate = function(){
	switch(this.type){
		case 'string':
			return this.validateString();
		case 'integer':
		case 'number':
			return this.validateNumber();
		case 'boolean':
			// return this.validateBoolean();
			break;
	}
}

PrimitiveType.prototype.parse = function(x){

	if (x == null){
		if (this.default) return this.default;
		assert( this.required === false );
		return null;
	}
	
	switch(this.type){
		case 'string':
			return this.parseString(x);
		case 'integer':
			return this.parseInteger(x);
		case 'number':
			return this.parseNumber(x);
		case 'boolean':
			return this.parseBoolean(x);
	}
}

PrimitiveType.AcceptedList = [ "string", "integer", "number", "boolean" ]

PrimitiveType.prototype.validateString = function(){
	if(this.minLength){
		assert(typeof this.minLength == 'number');
	}
	if(this.maxLength){
		assert(typeof this.maxLength == 'number');
	}
	if(this.minLength && this.maxLength){
		assert(this.minLength < this.maxLength);
	}

	if(this.pattern){
		assert.doesNotThrow(()=>{ new RegExp(this.pattern) });
		this.default && assert.equal(new RegExp(this.pattern).test(this.default), true);
	}
	if (this.enum) {
		assert(this.enum instanceof Array);
		this.minLength && this.enum.map(e=>assert(e.length >= minLength));
		this.maxLength && this.enum.map(e=>assert(e.length <= minLength));
		this.default && assert( this.enum.indexOf(this.default) >= 0 );
		this.pattern && assert( ! this.enum.map(e => new RegExp(this.pattern).test(e)).includes(false) );
	}

	if(this.uppercase != null){
		assert(typeof this.uppercase === 'boolean');
	}
	if(this.lowercase != null){
		assert(typeof this.lowercase === 'boolean');
	}
}
PrimitiveType.prototype.parseString = function(x){

	if (this.format === "binary"){
		assert( isMultipartyFile(x) );
		return x;
	}

	assert( typeof x === 'string' );

	if(this.minLength){
		assert( x.length >= this.minLength );
	}
	if(this.maxLength){
		assert( x.length <= this.maxLength );
	}
	if(this.pattern){
		assert(new RegExp(this.pattern).test(x));
	}
	
	if (this.enum) {
		assert(this.enum.indexOf(x) >= 0);
	}

	if (this.format === 'date' || this.format === 'date-time'){
		return new Date(x):
	}
	
	if (this.uppercase === true) return x.toUpperCase();

	if (this.lowercase === true) return x.toLowerCase();

	return x;
}

PrimitiveType.prototype.validateNumber = function(){
	if(this.min != null){
		assert(typeof this.min === 'number');
	}
	
	if(this.max != null){
		assert(typeof this.max === 'number');
	}
	
	if(this.max != null && this.min != null){
		assert(this.max > this.min);
	}
	
	if(this.exclusiveMinimum != null){
		assert(typeof this.exclusiveMinimum === 'boolean');
	}

	if(this.exclusiveMaximum != null){
		assert(typeof this.exclusiveMaximum === 'boolean');
	}

	if (this.format){
		assert(typeof this.format === 'string');
		assert((this.type == 'integer' ? ['int32', 'int64'] : ['float', 'double']).indexOf(this.format) >= 0);
	}
}

PrimitiveType.prototype.parseNumber = function(x){

	assert( typeof x === 'number' || typeof x === "string" );
	x = this.type === 'integer' ? parseInt(x) : parseFloat(x);

	if(this.min != null){
		assert(this.exclusiveMinimum === true ? (x > this.min) : (x >= this.min));
	}
	
	if(this.max != null){
		assert(this.exclusiveMaximum === true ? (x < this.max) : (x <= this.max));
	}
	return x;
}


PrimitiveType.prototype.parseBoolean = function(x){
	x = x === 'true' ? true : x === 'false' ? false : x; 
	assert( typeof x === 'boolean' );
	return x;
}

let MixedType = function(){}

let ArrayType = function(){}

let ObjectType = function(){}

let ModelParser = function(model, rootSpec = {}){

}