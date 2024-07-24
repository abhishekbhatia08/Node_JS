// To trace 
// const f1 = () => console.trace();
// const f2 = () => f1();

// f2();

const progressBar = require("progress");

const bar = new progressBar("Downloading [:bar] :rate :percent :eta", {
    total: 20,
});

const timer = setInterval(() => {
    bar.tick();
    if (bar.complete) {
        clearInterval(timer);
    }
}, 100);
