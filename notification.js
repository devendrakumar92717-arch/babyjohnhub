/* ==========================================================
   BabyJohnHub OTT
   Notification System
   notification.js
   Large Part 1 / 3
========================================================== */

"use strict";

/* ======================================
   Local Storage Key
====================================== */

const NOTIFICATION_KEY = "BJH_NOTIFICATIONS";

/* ======================================
   Elements
====================================== */

const notificationContainer =
document.getElementById(
    "notificationContainer"
);

/* ======================================
   Get Notifications
====================================== */

function getNotifications(){

    return JSON.parse(

        localStorage.getItem(

            NOTIFICATION_KEY

        )

    ) || [];

}

/* ======================================
   Save Notifications
====================================== */

function saveNotifications(list){

    localStorage.setItem(

        NOTIFICATION_KEY,

        JSON.stringify(list)

    );

}

/* ======================================
   Add Notification
====================================== */

function addNotification(data){

    let list = getNotifications();

    list.unshift({

        id:Date.now(),

        title:data.title,

        message:data.message,

        type:data.type || "system",

        priority:data.priority || "low",

        time:new Date().toLocaleString(),

        read:false

    });

    saveNotifications(list);

    renderNotifications();

}

/* ======================================
   Remove Notification
====================================== */

function removeNotification(id){

    let list = getNotifications();

    list = list.filter(

        item=>item.id!==id

    );

    saveNotifications(list);

    renderNotifications();

}

/* ======================================
   Mark As Read
====================================== */

function markAsRead(id){

    const list = getNotifications();

    list.forEach(item=>{

        if(item.id===id){

            item.read=true;

        }

    });

    saveNotifications(list);

    renderNotifications();

}

/* ======================================
   Render Notifications
====================================== */

function renderNotifications(){

    if(!notificationContainer) return;

    const list = getNotifications();

    notificationContainer.innerHTML="";

    if(!list.length){

        notificationContainer.innerHTML=`

        <div class="empty-notification">

            <h3>No Notifications</h3>

            <p>You don't have any notifications.</p>

        </div>

        `;

        return;

    }

    list.forEach(item=>{

        notificationContainer.innerHTML+=`

        <div class="notification-card notification-${item.type} ${item.read ? "notification-read" : ""} notification-fade">

            ${item.read ? "" : "<span class='unread-dot'></span>"}

            <div class="notification-icon">

                🔔

            </div>

            <div class="notification-content">

                <div class="notification-title">

                    ${item.title}

                </div>

                <div class="notification-message">

                    ${item.message}

                </div>

                <div class="notification-time">

                    ${item.time}

                </div>

                <div class="notification-actions">

                    <button
                    class="notification-btn mark-read"
                    data-id="${item.id}">

                        Read

                    </button>

                    <button
                    class="notification-btn delete-notification"
                    data-id="${item.id}">

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

console.log("Notification Large Part 1 Ready");
