
const applicationServerPublicKey = "BFyZi9IfN2L5weBxSFgXvDPLVEhgjh8Z1kpDneAl_5tgyKIP1TjkvJh5grSNnmQQ1CGdWikULZD50OnDTAuL1Cw";

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

function checkPushNotifications()
{
    swRegistration.pushManager.getSubscription()
    .then(function(subscription) {
        isSubscribed = !(subscription === null);

        if (isSubscribed) {
        console.log('User IS subscribed.');
        } else {
        console.log('User is NOT subscribed.');
        subscribeForPush();
        }
    });
}
function subscribeForPush()
{
    var publicKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(function(subscription) {
        console.log('User is subscribed.');
    
        updateSubscriptionOnServer(subscription);
    
        isSubscribed = true;
    
        updateBtn();
      })
      .catch(function(err) {
        console.log('Failed to subscribe the user: ', err);
        updateBtn();
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