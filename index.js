var StyleguideCSS = function(string, options) {

	var docBlocks = findDocBlock(string)
	if (!docBlocks.length) {
		return null
	}
	// else

	var parsedDockBlocks = []

	docBlocks.forEach(function pushDocBlock(string) {
		this.push(parseDocBlock(string))
	}, parsedDockBlocks)

	return parsedDockBlocks
}

function findDocBlock(string) {
	var docBlocks = []

	// @todo look for /** */ blocks

	return docBlocks
}

function parseDocBlock(string) {
	var docBlock = {}

	// @todo parse comment block

	return docBlock
}

module.exports = StyleguideCSS
