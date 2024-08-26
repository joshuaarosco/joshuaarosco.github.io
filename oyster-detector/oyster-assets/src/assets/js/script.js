const button = document.querySelector("#notif")

button.addEventListener("click", () => {
    Notification.requestPermission().then(perm => {
        if(perm === "granted"){
            console.log(perm);
            const notification = new Notification("Example notification", {
                body:"This is more text",
                data: { hello: "world"}
            });

            notification.addEventListener("close", e => {
                console.log(e);
            })
        }
    })
})