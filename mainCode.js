if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("ServiceWorker and push notifications are supported");
  
    navigator.serviceWorker.register("sw.js")
    .then(function(swReg) {
      console.log("Service Worker is registered", swReg);
  
      swRegistration = swReg;
    })
    .catch(function(error) {
      console.error("Service Worker Error", error);
    });
  } else {
    console.warn("Service workers or push notifications are not supported!");
  }