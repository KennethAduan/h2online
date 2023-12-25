/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Badge,
} from "@material-tailwind/react";
import FetchNotification from "../../../firebase/hooks/FetchNotification";
import { useState } from "react";
import { IconButton } from "@mui/material";
import moment from "moment";
function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
const NotificationButton = () => {
  const notificationData = FetchNotification();
  // const notificationNumber = notificationData.length;
  const [badgeVisible, setBadgeVisible] = useState(true);
  // Determine whether to show the badge
  const showBadge = badgeVisible && notificationData.length > 0;
  // console.log(notificationData);
  return (
    <Badge content={notificationData.length} invisible={!showBadge}>
      <Menu placement="left-end">
        <MenuHandler>
          <IconButton onClick={() => setBadgeVisible(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
              color="white"
            >
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                clipRule="evenodd"
              />
            </svg>
          </IconButton>
        </MenuHandler>
        <MenuList
          className="flex flex-col gap-20 w-42 h-96"
          placeholder={undefined}
        >
          <div>
            <h1 className="mt-16 text-xl text-center text-PrimaryBackGround text-bold">
              Notifications
            </h1>
            <hr className="border-gray-300 mborder-t-2" />
          </div>
          {notificationData.map((data: any, index: any) => {
            return (
              <MenuItem
                className="flex items-center gap-4 py-2 pl-2 pr-8"
                placeholder={undefined}
                key={index}
              >
                <Avatar
                  placeholder={undefined}
                  variant="circular"
                  alt="tania andrew"
                  src="/h2o-logo.png"
                />
                <div className="flex flex-col gap-1">
                  <Typography
                    variant="small"
                    color="black"
                    className="font-semibold"
                    placeholder={undefined}
                  >
                    {data.title}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-semibold"
                    placeholder={undefined}
                  >
                    {data.message}
                  </Typography>
                  <Typography
                    className="flex items-center gap-1 text-sm font-medium text-blue-gray-500"
                    placeholder={undefined}
                  >
                    <ClockIcon />
                    {moment(data.date.toDate()).fromNow()}
                  </Typography>
                </div>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Badge>
  );
};

export default NotificationButton;
