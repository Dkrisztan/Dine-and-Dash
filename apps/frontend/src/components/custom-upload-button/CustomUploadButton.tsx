import { toast } from 'sonner';

import { UploadButton } from '@/utils/uploadthing';

export default function CustomUploadButton(props: { onComplete: (id: string) => void }) {
  return (
    <UploadButton
      className='col-span-3 ut-button:ut-ready:h-1/2 ut-button:ut-ready:w-full ut-button:ut-uploading:h-1/2 ut-button:ut-uploading:w-full ut-button:ut-readying:h-1/2 ut-button:ut-readying:w-full ut-button:bg-emerald-800 ut-button:ut-readying:bg-emerald-800/50 after:ut-button:ut-uploading:bg-emerald-500/50'
      endpoint='profileImageUploader'
      onClientUploadComplete={(res) => {
        props.onComplete(res[0].serverData.fileUrl);
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );
}
