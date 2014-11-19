(function() {

    var gallery = document.getElementById("mygallery");
    var items = gallery.getElementsByTagName("figure");
    var activeItem = null;

    function hideAll() {
        for (var i = 0, len = items.length; i < len; i++) {
            items[i].classList.remove("active");
        }
    }

    function getNextElementSibling(node) {
        var sibling = node.nextSibling;
        if (sibling === null) {
            // if no next sibling could be found, return false
            return false;
        }
        if (sibling.nodeType === 1) {
            // only return actual element nodes, not text nodes
            return sibling;
        } else {
            return getNextElementSibling(sibling);
        }
    }

    function nextItem() {
        var next = getNextElementSibling(activeItem);
        if (next === false) {
            activeItem = items[0];
        } else {
            activeItem = next;
        }
        hideAll();
        activeItem.classList.add("active");
    }

    function initGallery() {
        gallery.classList.add("js");
        hideAll();
        activeItem = items[0];
        activeItem.classList.add("active");

        gallery.addEventListener("click", nextItem);
    }

    initGallery();

})();
