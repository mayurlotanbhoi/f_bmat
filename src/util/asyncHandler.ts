import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { loader } from "./images.util";

// Your custom SweetAlert2 instance
const MySwal = withReactContent(Swal);

type Options = {
  loadingHtml?: string;
  successHtml?: string;
  errorHtml?: string;
  defaultMessage?: string;
  preConfirmHtml?: string;
  confirmButtonText?: string;
  showConfirm?: boolean;
};

// export const asyncHandlerWithSwal = async<T>(
//     requestFn: () => Promise<T>,
//     options: Options = {}
// ): Promise<T | null> => {
//     const {
//         loadingHtml = "Please wait...",
//         successHtml = "Operation completed successfully!",
//         errorHtml = "Something went wrong!",
//         defaultMessage = "",
//         preConfirmHtml = "",
//         confirmButtonText = "OK",
//         showConfirm = false,
//     } = options;

//     try {
//         // Optional pre-confirmation modal
//         if (showConfirm) {
//             const confirmResult = await MySwal.fire({
//                 html: preConfirmHtml || "Are you sure you want to continue?",
//                 icon: "question",
//                 showCancelButton: true,
//                 confirmButtonText: confirmButtonText,
//             });

//             if (!confirmResult.isConfirmed) return null;
//         }

//         // Show loading
//         MySwal.fire({
//             html: loadingHtml,
//             allowOutsideClick: false,
//             allowEscapeKey: false,
//             showConfirmButton: false,
//             willOpen: () => {
//                 Swal.showLoading();
//             },
//         });

//         // Call the async function
//         const result = await requestFn();

//         // Show success
//         await MySwal.fire({
//             icon: "success",
//             html: successHtml || defaultMessage || "Success!",
//             confirmButtonText: "OK",
//         });

//         return result;
//     } catch (err: any) {
//         // Show error
//         await MySwal.fire({
//             icon: "error",
//             html: errorHtml || err.message || "An error occurred!",
//             confirmButtonText: "OK",
//         });
//         return null;
//     }
// };




export const asyncHandlerWithSwal = async (callback, messages) => {
  try {
    Swal.fire({
      title: 'Please wait',
      color: 'white',
      html: messages.loadingHtml || 'Loading...',
      allowOutsideClick: false,
      showConfirmButton: false,

      didOpen: () => Swal.showLoading(),
      customClass: {
        popup: 'custom-swal-popup',
        htmlContainer: 'custom-swal-html',

      },
    });

    const result = await callback();


    Swal.fire({
      icon: 'success',
      html: result?.success ? result?.message
 :  messages.successHtml || 'Success!',
      customClass: {
        popup: 'custom-swal-popup',
        htmlContainer: 'custom-swal-html text-white ',
      },
    });

    return result;
  } catch (error) {
    let message = messages.errorHtml || 'Something went wrong';

    //  Extract meaningful error message from API response
    if (error?.data?.message) {
      message = error.data.message;
    } else if (error?.message) {
      message = error.message;
    }

    console.log("Error message:", message);

    if (message === 'Validation failed'){
      console.log("Validation failed:", error?.data?.data?.errors
);

      if (error?.data?.data?.errors && Array.isArray(error?.data?.data?.errors)) {
        const errorList = error.data.data.errors
          .map(err => `
      <li style="margin-bottom: 6px; display: flex; align-items: center;">
        <span style="color: red; font-size: 14px; margin-right: 8px;">❌</span>
        <span style="font-size: 14px; color: #333;">${err.message}</span>
      </li>
    `)
          .join('');

        message = `
    <div style="
      text-align: left; 
      font-family: Arial, sans-serif; 
      background: #fff3f3; 
      padding: 12px 16px; 
      border: 1px solid #f5c2c7; 
      border-radius: 6px;
    ">
      <p style="
        font-size: 15px; 
        font-weight: bold; 
        color: #b02a37; 
        margin-bottom: 8px;
      ">
        Please correct the following:
      </p>
      <ul style="margin: 0; padding-left: 20px; color: red; list-style: none;">
        ${errorList}
      </ul>
    </div>
  `;
      }
    }

    Swal.fire({
      icon: 'error',
      title: 'Validation Errors',
      html: message,
      confirmButtonColor: '#d33',
    });

    throw error; // so caller can still handle it
  }
};

