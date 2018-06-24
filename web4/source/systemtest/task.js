/**
 * @private
 * @constructor
 * @struct
 */
var TaskA = function()
{
	/** @type {!number} */
	this.m_count = 0;

	/** @type {null|Object} */
	this.m_div = null;
};

/**
 * @param {!DSC.Framework} in_framework
 * @param {!number} in_timeDelta
 * @return {!boolean} 
 */
TaskA.prototype.Run = function(in_framework, in_timeDelta)
{
	//DSC.Log(LOG, "Run in_timeDelta:" + in_timeDelta);
	this.m_count += 1;
	
	if (null === this.m_div)
	{
		this.m_div = in_framework.m_document.getElementById("divId");
	}
	if (null !== this.m_div)
	{
		this.m_div.innerHTML = "TaskA:" + this.m_count;
	}

	return (this.m_count < 100);
};

/**
 * @private
 * @constructor
 * @struct
 */
var TaskB = function()
{
	/** @type {null|Object} */
	this.m_div = null;
};

/**
 * @param {!DSC.Framework} in_framework
 * @param {!number} in_timeDelta
 * @return {!boolean} 
 */
TaskB.prototype.Run = function(in_framework, in_timeDelta)
{
	if (null === this.m_div)
	{
		this.m_div = in_framework.m_document.getElementById("divId");
	}
	if (null !== this.m_div)
	{
		this.m_div.innerHTML = "TaskB";
	}

	return false;
};

/**
 */
DSC.OnPageLoad = function()
{
	DSC.Log(LOG, "OnPageLoad");

	/** @type {!DSC.Framework} */
	var framework = DSC.Framework.Factory(document);
	/** @type {!TaskA} */
	var taskA = new TaskA();
	/** @type {!TaskB} */
	var taskB = new TaskB();
	framework.PushTask(taskB);
	framework.PushTask(taskA);
}

window.addEventListener('load', DSC.OnPageLoad, true);