/*
fn1
	floor
	ceil
	log2
fn2
	add
	minus
	mul
	div
*/

c.InstructionContext.lqre = {}
c.InstructionContext["lqre"] = c.InstructionContext.lqre;

c.InstructionContext.lqre["floor"] = function (in_paramA) {
	return Math.floor(in_paramA);
}
c.InstructionContext.lqre["ceil"] = function (in_paramA) {
	return Math.ceil(in_paramA);
}
c.InstructionContext.lqre["log2"] = function (in_paramA) {
	return Math.log2(in_paramA);
}
c.InstructionContext.lqre["add"] = function (in_paramA, in_paramB) {
	return (in_paramA + in_paramB);
}
c.InstructionContext.lqre["minus"] = function (in_paramA, in_paramB) {
	return (in_paramA - in_paramB);
}
c.InstructionContext.lqre["mul"] = function (in_paramA, in_paramB) {
	return (in_paramA * in_paramB);
}
c.InstructionContext.lqre["div"] = function (in_paramA, in_paramB) {
	//c.Log(LOG, "InstructionContext.lqre.div in_paramA:" + in_paramA + " in_paramB:" + in_paramB);
	return (in_paramA / in_paramB);
}
