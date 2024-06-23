const popupDisplayAndHide = (type,wait, args = {}) => {
    
    return new Promise((resolve, reject) => {
        const time = popup(type, "in", args);
        setTimeout(() => {
            const animTime = popup(type, "out", args)
            setTimeout(() => {
                resolve(true);
            }, animTime);
        }, time + (wait * 1000));
    });
} 

const init = () => {
    popupDisplayAndHide("up",wait=.2, {title: "Hello Stranger"}).then((res) => {
        popupDisplayAndHide("up",wait=.2, {title: "Let's get started?"})
    });
    

};


document.addEventListener("DOMContentLoaded", init);