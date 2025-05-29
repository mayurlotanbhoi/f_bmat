// src/components/PushNotificationToggle.tsx

// import { usePushNotifications } from '../hooks/usePushNotifications';

export default function PushNotificationToggle() {
    // const { isSubscribed, error, subscribeUser, unsubscribeUser } = usePushNotifications();

    // console.log('isSubscribed', isSubscribed);
    // subscribeUser();

    return (
        <div className=' mt-44'>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={subscribeUser}>Enable Push Notifications</button> */}


            {/* {isSubscribed ? (
                <button onClick={unsubscribeUser}>Disable Push Notifications</button>
            ) : (
                <button onClick={subscribeUser}>Enable Push Notifications</button>
            )} */}
        </div>
    );
}
