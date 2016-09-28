(function main() {
	if ( app.documents.length > 0 ) {
		doc = app.activeDocument;
		layer = doc.activeLayer;
		var g = layer.groupItems.add();

		group( g, layer.pageItems );

		var board = doc.artboards[doc.artboards.getActiveArtboardIndex()];

		rescale( g, board );

		ungroup(g);
		

	}
})();



function rescale( g, board ) {

	var scaleBy = (g.width > g.height) ? g.width : g.height;
	var proportion = (g.width > g.height) ? 892/g.width : 892/g.height;	

	var canvasSize = 1000;
	var shift = 50;

	var sc = 100 * proportion;
	var boardRect = board.artboardRect; // [0, 0, 1000, -1000]

	g.resize( sc, sc );
	g.position = [ (boardRect[2]-g.width)/2, (boardRect[3] - shift + g.height)/2]; // the artboard bottom is negative

}


function group( gg, items ) {

	var newItem;
	for(var i=items.length-1; i>=0; i--) {
		
		if (items[i]!=gg) { 
			newItem = items[i].move(gg, ElementPlacement.PLACEATBEGINNING);
		}
	}
}

function ungroup( gg ) {
	var parent = gg.parent;
	for(var i=gg.pageItems.length-1; i>=0; i--) {
		gg.pageItems[i].move( parent, ElementPlacement.PLACEATBEGINNING);
	}
}