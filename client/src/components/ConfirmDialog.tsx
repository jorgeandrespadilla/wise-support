import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import Button from './Button';

type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
  setVisible: (isVisible: boolean) => void;
};

function ConfirmDialog({
  title,
  description,
  confirmText = 'Sí',
  cancelText = 'No',
  onConfirm = () => { },
  onCancel = () => { },
  visible,
  setVisible,
}: ConfirmDialogProps) {

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog onClose={() => onCancel()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
                <div className="mt-4 space-x-2 flex justify-end">
                  <Button size="sm" type='secondary' onClick={() => {
                    onCancel();
                  }}>{cancelText}</Button>
                  <Button size="sm" type='danger' onClick={() => {
                    onConfirm();
                  }}>{confirmText}</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ConfirmDialog;