import "../../../styles/SelectPaymentStyles.css";
import { ChangeEvent } from "react";
import { useAppDispatch } from "@/utils/redux/hooks";
import { setPaymentType } from "@/utils/redux/slice/orderSlice";
const SelectPayment = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const dispatch = useAppDispatch();
  const handlePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPaymentType(event.target.value));
  };
  //   console.log(selectedPayment);
  return (
    <div>
      <div className="radio-inputs">
        {/* Cash */}
        <label>
          <input
            defaultChecked
            className="radio-input"
            type="radio"
            name="payment"
            value="Cash"
            onChange={handlePaymentChange}
          />
          <span className="radio-tile">
            <span className="radio-icon">
              <svg
                fill="#014762"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#014762"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path d="M5.5 5c-.655 0-.66 1.01 0 1h22c.286 0 .5.214.5.5v13c0 .66 1 .66 1 0v-13c0-.822-.678-1.5-1.5-1.5h-22zm-2 2c-.654 0-.654 1 0 1h22c.286 0 .5.214.5.5v13c0 .665 1.01.66 1 0v-13c0-.822-.678-1.5-1.5-1.5h-22zm-2 2C.678 9 0 9.678 0 10.5v12c0 .822.678 1.5 1.5 1.5h22c.822 0 1.5-.678 1.5-1.5v-12c0-.822-.678-1.5-1.5-1.5h-22zm0 1h22c.286 0 .5.214.5.5v12c0 .286-.214.5-.5.5h-22c-.286 0-.5-.214-.5-.5v-12c0-.286.214-.5.5-.5zm1 1c-.276 0-.5.224-.5.5v2c0 .672 1 .656 1 0V12h1.5c.672 0 .656-1 0-1h-2zm10 0C9.468 11 7 13.468 7 16.5S9.468 22 12.5 22s5.5-2.468 5.5-5.5-2.468-5.5-5.5-5.5zm8 0c-.656 0-.672 1 0 1H22v1.5c0 .656 1 .672 1 0v-2c0-.276-.224-.5-.5-.5h-2zm-8 1c2.49 0 4.5 2.01 4.5 4.5S14.99 21 12.5 21 8 18.99 8 16.5s2.01-4.5 4.5-4.5zm0 1c-.277 0-.5.223-.5.5v.594c-.578.21-1 .76-1 1.406 0 .82.68 1.5 1.5 1.5.28 0 .5.212.5.5 0 .288-.22.5-.5.5h-1c-.338-.005-.5.248-.5.5s.162.505.5.5h.5v.5c0 .277.223.5.5.5s.5-.223.5-.5v-.594c.578-.21 1-.76 1-1.406 0-.82-.68-1.5-1.5-1.5-.28 0-.5-.212-.5-.5 0-.288.22-.5.5-.5h1c.338.005.5-.248.5-.5s-.162-.505-.5-.5H13v-.5c0-.277-.223-.5-.5-.5zm-10 6.002c-.25-.002-.5.162-.5.498v2c0 .276.224.5.5.5h2c.656 0 .672-1 0-1H3v-1.5c0-.328-.25-.496-.5-.498zm20 0c-.25.002-.5.17-.5.498V21h-1.5c-.672 0-.656 1 0 1h2c.276 0 .5-.224.5-.5v-2c0-.336-.25-.5-.5-.498z" />
                </g>
              </svg>
            </span>
            <span className="radio-label">Cash</span>
          </span>
        </label>
        {/* Gcash */}
        <label>
          <input
            className="radio-input"
            type="radio"
            name="payment"
            value="GCash"
            onChange={handlePaymentChange}
          />
          <span className="radio-tile">
            <span className="radio-icon">
              <svg
                viewBox="0 0 192 192"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#014762"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    stroke="#014762"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={12}
                    d="M84 96h36c0 19.882-16.118 36-36 36s-36-16.118-36-36 16.118-36 36-36c9.941 0 18.941 4.03 25.456 10.544"
                  />
                  <path
                    fill="#014762"
                    d="M145.315 66.564a6 6 0 0 0-10.815 5.2l10.815-5.2ZM134.5 120.235a6 6 0 0 0 10.815 5.201l-10.815-5.201Zm-16.26-68.552a6 6 0 1 0 7.344-9.49l-7.344 9.49Zm7.344 98.124a6 6 0 0 0-7.344-9.49l7.344 9.49ZM84 152c-30.928 0-56-25.072-56-56H16c0 37.555 30.445 68 68 68v-12ZM28 96c0-30.928 25.072-56 56-56V28c-37.555 0-68 30.445-68 68h12Zm106.5-24.235C138.023 79.09 140 87.306 140 96h12c0-10.532-2.399-20.522-6.685-29.436l-10.815 5.2ZM140 96c0 8.694-1.977 16.909-5.5 24.235l10.815 5.201C149.601 116.522 152 106.532 152 96h-12ZM84 40c12.903 0 24.772 4.357 34.24 11.683l7.344-9.49A67.733 67.733 0 0 0 84 28v12Zm34.24 100.317C108.772 147.643 96.903 152 84 152v12a67.733 67.733 0 0 0 41.584-14.193l-7.344-9.49Z"
                  />
                  <path
                    stroke="#014762"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={12}
                    d="M161.549 58.776C166.965 70.04 170 82.666 170 96c0 13.334-3.035 25.96-8.451 37.223"
                  />
                </g>
              </svg>
            </span>
            <span className="radio-label">GCash</span>
          </span>
        </label>
        {/* Card */}
        <label>
          <input
            className="radio-input"
            type="radio"
            name="payment"
            value="Card"
            onChange={handlePaymentChange}
          />
          <span className="radio-tile">
            <span className="radio-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.94358 3.25H14.0564C15.8942 3.24998 17.3498 3.24997 18.489 3.40314C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33856 22.5969 7.51098C22.6873 8.18385 22.7244 8.9671 22.7395 9.87428C22.7464 9.91516 22.75 9.95716 22.75 10C22.75 10.0353 22.7476 10.0699 22.7429 10.1039C22.75 10.6696 22.75 11.2818 22.75 11.9436V12.0564C22.75 13.8942 22.75 15.3498 22.5969 16.489C22.4392 17.6614 22.1071 18.6104 21.3588 19.3588C20.6104 20.1071 19.6614 20.4392 18.489 20.5969C17.3498 20.75 15.8942 20.75 14.0564 20.75H9.94359C8.10583 20.75 6.65019 20.75 5.51098 20.5969C4.33856 20.4392 3.38961 20.1071 2.64124 19.3588C1.89288 18.6104 1.56076 17.6614 1.40314 16.489C1.24997 15.3498 1.24998 13.8942 1.25 12.0564V11.9436C1.24999 11.2818 1.24999 10.6696 1.25714 10.1039C1.25243 10.0699 1.25 10.0352 1.25 10C1.25 9.95716 1.25359 9.91517 1.26049 9.87429C1.27564 8.96711 1.31267 8.18385 1.40314 7.51098C1.56076 6.33856 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40314C6.65019 3.24997 8.10582 3.24998 9.94358 3.25ZM2.75199 10.75C2.75009 11.1384 2.75 11.5541 2.75 12C2.75 13.9068 2.75159 15.2615 2.88976 16.2892C3.02502 17.2952 3.27869 17.8749 3.7019 18.2981C4.12511 18.7213 4.70476 18.975 5.71085 19.1102C6.73851 19.2484 8.09318 19.25 10 19.25H14C15.9068 19.25 17.2615 19.2484 18.2892 19.1102C19.2952 18.975 19.8749 18.7213 20.2981 18.2981C20.7213 17.8749 20.975 17.2952 21.1102 16.2892C21.2484 15.2615 21.25 13.9068 21.25 12C21.25 11.5541 21.2499 11.1384 21.248 10.75H2.75199ZM21.2239 9.25H2.77607C2.79564 8.66327 2.82987 8.15634 2.88976 7.71085C3.02502 6.70476 3.27869 6.12511 3.7019 5.7019C4.12511 5.27869 4.70476 5.02502 5.71085 4.88976C6.73851 4.75159 8.09318 4.75 10 4.75H14C15.9068 4.75 17.2615 4.75159 18.2892 4.88976C19.2952 5.02502 19.8749 5.27869 20.2981 5.7019C20.7213 6.12511 20.975 6.70476 21.1102 7.71085C21.1701 8.15634 21.2044 8.66327 21.2239 9.25ZM15.9553 12.25H16.0447C16.4776 12.2499 16.8744 12.2499 17.1972 12.2933C17.5527 12.3411 17.9284 12.4535 18.2374 12.7626C18.5465 13.0716 18.6589 13.4473 18.7067 13.8028C18.7501 14.1256 18.7501 14.5224 18.75 14.9553V15.0447C18.7501 15.4776 18.7501 15.8744 18.7067 16.1972C18.6589 16.5527 18.5465 16.9284 18.2374 17.2374C17.9284 17.5465 17.5527 17.6589 17.1972 17.7067C16.8744 17.7501 16.4776 17.7501 16.0447 17.75H15.9553C15.5224 17.7501 15.1256 17.7501 14.8028 17.7067C14.4473 17.6589 14.0716 17.5465 13.7626 17.2374C13.4535 16.9284 13.3411 16.5527 13.2933 16.1972C13.2499 15.8744 13.2499 15.4776 13.25 15.0447V14.9553C13.2499 14.5224 13.2499 14.1256 13.2933 13.8028C13.3411 13.4473 13.4535 13.0716 13.7626 12.7626C14.0716 12.4535 14.4473 12.3411 14.8028 12.2933C15.1256 12.2499 15.5224 12.2499 15.9553 12.25ZM14.8257 13.8219L14.8232 13.8232L14.8219 13.8257C14.8209 13.8276 14.8192 13.8309 14.8172 13.836C14.8082 13.8577 14.7929 13.9061 14.7799 14.0027C14.7516 14.2134 14.75 14.5074 14.75 15C14.75 15.4926 14.7516 15.7866 14.7799 15.9973C14.7929 16.0939 14.8082 16.1423 14.8172 16.164C14.818 16.1661 14.8188 16.1679 14.8195 16.1694C14.8205 16.1716 14.8213 16.1732 14.8219 16.1743L14.8232 16.1768L14.8257 16.1781C14.8276 16.1791 14.8309 16.1808 14.836 16.1828C14.8577 16.1918 14.9061 16.2071 15.0027 16.2201C15.2134 16.2484 15.5074 16.25 16 16.25C16.4926 16.25 16.7866 16.2484 16.9973 16.2201C17.0939 16.2071 17.1423 16.1918 17.164 16.1828C17.1691 16.1808 17.1724 16.1791 17.1743 16.1781L17.1768 16.1768L17.1781 16.1743C17.1791 16.1724 17.1808 16.1691 17.1828 16.164C17.1918 16.1423 17.2071 16.0939 17.2201 15.9973C17.2484 15.7866 17.25 15.4926 17.25 15C17.25 14.5074 17.2484 14.2134 17.2201 14.0027C17.2071 13.9061 17.1918 13.8577 17.1828 13.836C17.1816 13.833 17.1806 13.8307 17.1797 13.8288C17.1791 13.8275 17.1786 13.8265 17.1781 13.8257L17.1768 13.8232L17.1743 13.8219C17.1724 13.8209 17.1691 13.8192 17.164 13.8172C17.1423 13.8082 17.0939 13.7929 16.9973 13.7799C16.7866 13.7516 16.4926 13.75 16 13.75C15.5074 13.75 15.2134 13.7516 15.0027 13.7799C14.9061 13.7929 14.8577 13.8082 14.836 13.8172C14.8309 13.8192 14.8276 13.8209 14.8257 13.8219ZM5.25 13.5C5.25 13.0858 5.58579 12.75 6 12.75H8C8.41421 12.75 8.75 13.0858 8.75 13.5C8.75 13.9142 8.41421 14.25 8 14.25H6C5.58579 14.25 5.25 13.9142 5.25 13.5ZM14.8232 16.1768C14.823 16.1764 14.8228 16.1764 14.8232 16.1768C14.8237 16.1772 14.8236 16.177 14.8232 16.1768ZM17.1768 16.1768C17.1766 16.177 17.1767 16.1768 17.1768 16.1768ZM5.25 16.5C5.25 16.0858 5.58579 15.75 6 15.75H10C10.4142 15.75 10.75 16.0858 10.75 16.5C10.75 16.9142 10.4142 17.25 10 17.25H6C5.58579 17.25 5.25 16.9142 5.25 16.5Z"
                    fill="#014762"
                  />
                </g>
              </svg>
            </span>
            <span className="radio-label">Card</span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default SelectPayment;
