/**
 * we look after working out the timeDelta and calling the provided "task" function
 * when the task returns false, we call c.OnShutdown and 
 * @private
 * @final
 * @constructor
 * @struct
 * @this {c.Framework}
 * @param {!function(!number):boolean} in_task
 */
c.Framework = function(in_task) {
	this.m_task = in_task;

	this.m_time = undefined;
	this.m_averageFPS = undefined;

	//lines up a new frame to be rendered once thread is passed back to browser

	var that = this;
	this.m_requestAnimationFrameId = window.requestAnimationFrame(function(in_timeStamp){
		that.RequestAnimationFrameCallback(in_timeStamp);
	});

	return;
}
c["Framework"] = c.Framework;

/**
 * @param {!function(!number):boolean} in_task
 * @return {!c.Framework}
 */
c.Framework.Factory = function(in_task) {
	return new c.Framework(in_task);
}
c.Framework["Factory"] = c.Framework.Factory;

/**
 * @this {c.Framework}
 * @param {!number} in_timeStamp
 * @return {undefined}
 */
c.Framework.prototype.RequestAnimationFrameCallback = function(in_timeStamp) {
	this.m_requestAnimationFrameId = undefined;
	var timeDelta = this.IncrementTime(in_timeStamp);
	
	if (true === this.m_task(timeDelta)){
		var that = this;
		this.m_requestAnimationFrameId = window.requestAnimationFrame(function(_timeStamp){
			that.RequestAnimationFrameCallback(_timeStamp);
		});
	} else {
		c["OnShutdown"]();
		this.OnDestroy();
	}

	return;
}

/**
 * @return {undefined}
 */
c.Framework.prototype.OnCancelAnimationFrame = function() {
	if (undefined != this.m_requestAnimationFrameId) {
		window.cancelRequestAnimationFrame(this.m_requestAnimationFrameId);
		this.m_requestAnimationFrameId = undefined;
	}
	return;
}

/**
 * @return {undefined}
 */
c.Framework.prototype.OnDestroy = function() {
	if (undefined !== this.m_requestAnimationFrameId) {
		window.cancelAnimationFrame(this.m_requestAnimationFrameId);
		this.m_requestAnimationFrameId = undefined;
	}

	return;
}

/**
 * @param {!number} in_timeStamp
 * @return {!number}
 */
c.Framework.prototype.IncrementTime = function(in_timeStamp) {
	if (undefined === in_timeStamp) {
		return 0;
	}
	var timeDelta = 0.0;
	if (undefined === this.m_time) {
		this.m_time = in_timeStamp;
	} else {
		timeDelta = (in_timeStamp - this.m_time) / 1000.0;
		this.m_time = in_timeStamp;

		if (0.0 != timeDelta) {
			var fps = 1.0 / timeDelta;
			if (undefined === this.m_averageFPS) {
				this.m_averageFPS = fps;
			}
			else {
				this.m_averageFPS = (fps * 0.05) + (this.m_averageFPS * 0.95);
			}
		}
	}
	return timeDelta;
}
