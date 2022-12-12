import { useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

type MarkdownEditorProps = {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
};

const quillConfig = {
    theme: 'snow',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
    },
};

let loads = 0;

function MarkdownEditor({
    placeholder = "",
    value = "",
    onChange = () => { },
}: MarkdownEditorProps) {
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const initialValueRef = useRef(value);

    useEffect(() => {
        const editor = editorContainerRef.current?.querySelector('.ql-editor');
        if (!editor) {
            return;
        }
        
        if (loads === 0) {
            editor.innerHTML = value;
            initialValueRef.current = value;
        } else if (initialValueRef.current === "" && value !== initialValueRef.current) {
            // If the value changes and it's not the initial value, update the editor
            initialValueRef.current = value;
            editor.innerHTML = value;
        }
        loads++;
    }, [value]);

    useLayoutEffect(() => {
        let quill = new Quill(editorRef.current as Element, { placeholder, ...quillConfig });

        
        const insertInitialValue = () => {
            quill.clipboard.dangerouslyPasteHTML(0, initialValueRef.current);
            quill.blur();
        };
        const handleContentsChange = () => {
            initialValueRef.current = getHTMLValue() as string;
            onChange(getHTMLValue() as string);
        };
        const getHTMLValue = () => editorContainerRef.current?.querySelector('.ql-editor')?.innerHTML;

        insertInitialValue();

        quill.on('text-change', handleContentsChange);

        const editorContainer = editorContainerRef.current;
        return () => {
            quill.off('text-change', handleContentsChange);
            // Remove quill from the editor container
            editorContainer!.removeChild(editorContainer!.firstChild!);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={editorContainerRef}>
            <div ref={editorRef} />
        </div>
    );
};

export default MarkdownEditor;