/* 개별 
requirejs(['/js/data.js'], function(module) {
    console.log("loaded", module)
})
requirejs(['/js/render.js'], function(module) {
    console.log("loaded", module)
})
*/

// 동시
requirejs(['/js/render.js', '/js/data.js'], function(render, data) {
    console.log(render, data)
    render.draw(data)
})