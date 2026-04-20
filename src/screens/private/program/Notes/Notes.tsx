import { ContentState, Editor, EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';
import { Box, Card, IconButton, Text } from '@chakra-ui/react';

import { NotesProps } from './type';
import { appStore, notesSelector, useShallow } from '@appStore';
import { useEffect, useRef, useState } from 'react';
import { getAllStringExceptFirstLine, getFirstLineFromString } from './utils';

const color = '#cc99009f';
const Notes = (props: NotesProps) => {
  const editorRef = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [selectedNoteId, setSelectedNoteId] = useState<string>('0');

  const { notes, addNote, selectedNote, getCurrentId, deleteNote, editNote } =
    appStore(useShallow(notesSelector));
  const currentNote = selectedNote(selectedNoteId);

  useEffect(() => {
    if (selectedNoteId !== '0') {
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromText(
            selectedNoteId
              ? currentNote.title + '\n' + currentNote.description
              : '',
          ),
        ),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNoteId]);

  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      flexDir={'column'}
      aria-label="notes-app"
    >
      <Box
        width={'100%'}
        height={'6%'}
        bg={'neutral.600'}
        borderBottom={'1px solid #000000'}
        display={'flex'}
        flexDir={'row'}
        gap={2}
      >
        <IconButton
          aria-label="add-note"
          size={'sm'}
          icon={<Text fontSize={20}>+</Text>}
          onClick={() =>
            addNote({
              id: (getCurrentId() + 1).toString(),
              title: 'Title',
              description: 'Description',
              date: new Date().toLocaleDateString('en-GB'),
            })
          }
        />
        <IconButton
          aria-label="delete-note"
          size={'sm'}
          icon={<Text fontSize={20}>-</Text>}
          onClick={() => {
            if (selectedNoteId !== '0') {
              deleteNote(selectedNoteId);
              setSelectedNoteId('0');
            }
          }}
        />
      </Box>
      <Box
        width={'100%'}
        height={'94%'}
        borderBottom={'1px solid #000000'}
        display={'flex'}
        flexDir={'row'}
      >
        <Box
          width={'240px'}
          height={'100%'}
          bg={'neutral.600'}
          borderRight={'1px solid #000000'}
          gap={0}
          overflowY={'auto'}
          scrollPadding={0}
        >
          {Object.values(notes).map((note) => (
            <>
              <Card
                key={note.id}
                aria-label={`note-card-${note.id}`}
                bg={selectedNoteId === note.id ? color : '#1a13009f'}
                margin={2}
                padding={2}
                px={3}
                onClick={() => {
                  if (selectedNoteId !== '0') {
                    editNote({
                      id: selectedNoteId,
                      title: getFirstLineFromString(
                        editorState.getCurrentContent().getPlainText(),
                      ),
                      description: getAllStringExceptFirstLine(
                        editorState.getCurrentContent().getPlainText(),
                      ),
                      date: selectedNoteId ? currentNote?.date : '',
                    });
                  }
                  setSelectedNoteId(note.id);
                }}
                _hover={{
                  cursor: 'pointer',
                }}
                color={'#ffffff'}
                borderBottom={'1px solid #000000'}
              >
                <Text fontSize={15} noOfLines={1} fontWeight={'600'}>
                  {note.title}
                </Text>
                <Text fontSize={12} flexDir={'row'} display={'flex'}>
                  {note.date}
                  <Text noOfLines={1} color={'neutral.400'}>
                    {' -> '}
                    {note.description}
                  </Text>
                </Text>
              </Card>
            </>
          ))}
        </Box>
        <Box
          width={'80%'}
          aria-label="note-editor-box"
          height={'100%'}
          padding={5}
          bg={'#1a1a1a'}
          overflowY={'auto'}
          color={'white'}
          onClick={() => {
            editorRef.current?.focus();
          }}
          border={'1px solid #000000'}
        >
          <Editor
            ref={editorRef}
            editorState={editorState}
            onChange={setEditorState}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Notes;
