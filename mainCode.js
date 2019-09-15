const applicationServerPublicKey = "BFyZi9IfN2L5weBxSFgXvDPLVEhgjh8Z1kpDneAl_5tgyKIP1TjkvJh5grSNnmQQ1CGdWikULZD50OnDTAuL1Cw";
function registerPush()
{
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
        isSubscribed = !(subscription === null);

        if (isSubscribed) {
        console.log('User IS subscribed.');
        } else {
        console.log('User is NOT subscribed.');
        }
    });
}
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