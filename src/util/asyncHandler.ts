import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
      html: messages.loadingHtml || 'Loading...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const result = await callback();

    Swal.fire({
      icon: 'success',
      html: messages.successHtml || 'Success!',
    });

    return result;
  } catch (error) {
    let message = messages.errorHtml || 'Something went wrong';
    
    // ✅ Extract meaningful error message from API response
    if (error?.data?.message) {
      message = error.data.message;
    } else if (error?.message) {
      message = error.message;
    }

    Swal.fire({
      icon: 'error',
      html: `<b>${message}</b>`,
    });

    throw error; // so caller can still handle it
  }
};

