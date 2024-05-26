class ExpressError extends Error{
  constructor(message,statusCode){
    super();
    this.message=message;
    this.statusCode=statusCode;
  }
}

module.exports=ExpressError;

//Error is the built-in error object in JavaScript. By extending Error, your custom error class ExpressError inherits the properties and methods of the built-in Error class.
//Calling super(message): When you call super(message), it invokes the constructor of the Error class, passing message to it. This sets up the message property on the error instance correctly.
//Setting statusCode: this.statusCode = statusCode assigns the statusCode property to the instance of ExpressError.