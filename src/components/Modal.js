import React from "react";

export default function Modal({ showModal, setShowModal }) {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto max-w-sm mx-auto my-6">
              {/*content*/}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-gray-300 border-solid rounded-t">
                  <h3 className="w-full text-3xl font-semibold text-center text-gray-900">
                    Copied{" "}
                    <span role="img" aria-label="image of clipboard">
                      📋
                    </span>
                  </h3>
                </div>
                <button
                  className="absolute top-0 right-0 p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                    ×
                  </span>
                </button>

                {/*body*/}
                <div className="relative flex-auto p-6">
                  <p className="text-lg leading-relaxed text-center text-gray-600">
                    This list url has been copied to your clipboard. Share the
                    link!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
