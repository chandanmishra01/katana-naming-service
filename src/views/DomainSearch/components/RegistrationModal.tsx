type Props = {
  children?: React.ReactNode;
  onCloseReset: () => void;
};

function RegistrationModal({ children, onCloseReset }: Props) {
  return (
    <div>
      <button
        className="w-fit px-6 py-3.5 bg-white/10 mt-10 border border-gray-400 rounded-3xl bg-gradient-to-r from-[#ffe600] via-[#ffef87] to-[#3ad9ff] text-base font-extrabold uppercase tracking-[0.35em] text-[#041029] transition-all duration-100 ease-out hover:shadow-[0_0_60px_rgba(74,217,255,0.45)]"
        onClick={() => {
          try {
            typeof window !== "undefined" &&
              // @ts-ignore
              window?.modal__register_domain?.showModal();
          } catch (error) {
            console.log(`🚀 ~ file: RegistrationModal.tsx:30 ~ error:`, error);
          }
        }}
      >
        Register{" "}
      </button>
      <dialog
        id="modal__register_domain"
        className="modal backdrop-brightness-50"
      >
        <form
          method="dialog"
          className="modal-box border-[0.5px] border-gray-400/50"
        >
          <button
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            onClick={() => {
              onCloseReset();
            }}
          >
            ✕
          </button>
          {children}
        </form>
      </dialog>
    </div>
  );
}

export default RegistrationModal;
