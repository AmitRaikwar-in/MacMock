import { TopAppMenuTreeStructure } from '../../../../../types/menu';

export const NOTES: TopAppMenuTreeStructure = {
  id: 'notes',
  menuTree: [
    {
      title: 'Notes',
      type: 'main',
      items: {
        aboutNotes: {
          title: 'About Notes',
          hasDivider: true,
          action: () => {},
        },
        settings: {
          title: 'Settings...',
          hasDivider: false,
          action: () => {},
          command: '⌘,',
        },
        accounts: {
          title: 'Accounts...',
          hasDivider: true,
          action: () => {},
        },
        closeAllLockedNotes: {
          title: 'Close All Locked Notes',
          hasDivider: true,
          action: () => {},
        },
        services: {
          title: 'Services',
          hasDivider: true,
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Services',
              hasDivider: true,
              action: () => {},
            },
          ],
        },
        hideNotes: {
          title: 'Hide Notes',
          hasDivider: false,
          action: () => {},
          command: '⌘H',
        },
        hideOthers: {
          title: 'Hide Others',
          hasDivider: false,
          action: () => {},
          command: '⌥⌘H',
        },
        showAll: {
          title: 'Show All',
          hasDivider: true,
          action: () => {},
        },
        quitNotes: {
          title: 'Quit Notes',
          hasDivider: false,
          action: () => {},
          isQuitAction: true,
        },
      },
    },
    {
      title: 'File',
      type: 'normal',
      items: {
        newNote: {
          title: 'New Note',
          hasDivider: true,
          action: () => {},
          command: '⌘N',
        },
        newFolder: {
          title: 'New Folder',
          hasDivider: false,
          action: () => {},
          command: '⇧⌘N',
        },
        newSmartFolder: {
          title: 'New Smart Folder',
          hasDivider: true,
          action: () => {},
        },
        shareNote: {
          title: 'Share Note',
          hasDivider: true,
          action: () => {},
        },
        newSmartFolderWithTagSelection: {
          title: 'New Smart Folder with Tag Selection...',
          hasDivider: true,
          action: () => {},
        },
        close: {
          title: 'Close',
          hasDivider: true,
          action: () => {},
          command: '⌘W',
        },
        importFromIPhoneOrIPad: {
          title: 'Import from iPhone or iPad',
          hasDivider: true,
          action: () => {},
          subSubtree: [
            {
              title: 'Take Photo',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Scan Document',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Add sketch',
              hasDivider: false,
              action: () => {},
            },
          ],
        },
        exportAsPDF: {
          title: 'Export as PDF...',
          hasDivider: false,
          action: () => {},
        },
        openInPages: {
          title: 'Open in Pages',
          hasDivider: true,
          action: () => {},
        },
        pinNote: {
          title: 'Pin Note',
          hasDivider: false,
          action: () => {},
        },
        lockNote: {
          title: 'Lock Note',
          hasDivider: false,
          action: () => {},
        },
        duplicateNote: {
          title: 'Duplicate Note',
          hasDivider: true,
          action: () => {},
          command: '⌘D',
        },
        print: {
          title: 'Print...',
          hasDivider: true,
          action: () => {},
          command: '⌘P',
        },
      },
    },
    {
      type: 'normal',
      title: 'Edit',
      items: {
        undo: {
          hasDivider: false,
          title: 'Undo',
          command: '⌘ Z',
          action: () => {},
        },
        redo: {
          hasDivider: true,
          title: 'Redo',
          command: '⇧ ⌘ Z',
          action: () => {},
        },
        cut: {
          hasDivider: false,
          title: 'Cut',
          command: '⌘ X',
          action: () => {},
        },
        copy: {
          hasDivider: false,
          title: 'Copy',
          command: '⌘ C',
          action: () => {},
        },
        paste: {
          hasDivider: false,
          title: 'Paste',
          command: '⌘ V',
          action: () => {},
        },
        pasteAndMatchStyle: {
          hasDivider: false,
          title: 'Paste and Match Style',
          command: '⇧ ⌥ ⌘ V',
          action: () => {},
        },
        pasteAndRetainStyle: {
          hasDivider: false,
          title: 'Paste and Retain Style',
          command: '⌥ ⌘ V',
          action: () => {},
        },
        delete: {
          hasDivider: false,
          title: 'Delete',
          command: '⌫',
          action: () => {},
        },
        rename: {
          hasDivider: false,
          title: 'Rename',
          action: () => {},
        },
        selectAll: {
          hasDivider: true,
          title: 'Select All',
          command: '⌘ A',
          action: () => {},
        },
        attachFile: {
          hasDivider: false,
          title: 'Attach File',
          action: () => {},
        },
        addLink: {
          hasDivider: false,
          title: 'Add Link',
          action: () => {},
        },
        renameAttachment: {
          hasDivider: true,
          title: 'Rename Attachment',
          action: () => {},
        },
        find: {
          hasDivider: false,
          title: 'Find...',
          command: '⌘ F',
          action: () => {},
        },
        spellAndGrammar: {
          hasDivider: false,
          title: 'Spelling and Grammar',
          action: () => {},
        },
        substitutions: {
          hasDivider: false,
          title: 'Substitutions',
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Show Substitutions',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Smart Copy/Paste',
              hasDivider: false,
              action: () => {},
            },
          ],
        },
        transformations: {
          hasDivider: false,
          title: 'Transformations',
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Make Upper Case',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Make Lower Case',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Capitalize',
              hasDivider: false,
              action: () => {},
            },
          ],
        },
        speech: {
          hasDivider: true,
          title: 'Speech',
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Start Speaking',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Stop Speaking',
              hasDivider: false,
              action: () => {},
            },
          ],
        },
        autoFill: {
          hasDivider: false,
          title: 'Auto Fill',
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Contact...',
              action: () => {},
              hasDivider: false,
            },
            {
              title: 'Passwords...',
              action: () => {},
              hasDivider: false,
            },
          ],
        },
        startDictation: {
          hasDivider: false,
          title: 'Start Dictation',
          action: () => {},
          command: '🎤',
        },
        emojiSymbols: {
          hasDivider: false,
          title: 'Emoji & Symbols',
          action: () => {},
          command: '🙂',
        },
      },
    },
    {
      type: 'normal',
      title: 'Format',
      items: {
        title: {
          hasDivider: false,
          title: 'Title',
          action: () => {},
          command: '⌘ ⇧ T',
        },
        heading: {
          hasDivider: false,
          title: 'Heading',
          action: () => {},
          command: '⌘ ⇧ H',
        },
        subheading: {
          hasDivider: false,
          title: 'Subheading',
          action: () => {},
          command: '⌘ ⇧ J',
        },
        body: {
          hasDivider: false,
          title: 'Body',
          action: () => {},
          command: '⌘ ⇧ B',
        },
        monoStyled: {
          hasDivider: false,
          title: 'Monostyled',
          action: () => {},
          command: '⌘ ⇧ M',
        },
        bulletedList: {
          hasDivider: false,
          title: 'Bulleted List',
          action: () => {},
          command: '⌘ ⇧ 7',
        },
        dashedList: {
          hasDivider: false,
          title: 'Dashed List',
          action: () => {},
          command: '⌘ ⇧ 8',
        },
        numberedList: {
          hasDivider: false,
          title: 'Numbered List',
          action: () => {},
          command: '⌘ ⇧ 9',
        },
        blockQuote: {
          hasDivider: true,
          title: 'Block Quote',
          action: () => {},
          command: "⌘ '",
        },
        checkList: {
          hasDivider: false,
          title: 'Checklist',
          action: () => {},
          command: '⌘ ⇧ L',
        },
        markAsTicked: {
          hasDivider: false,
          title: 'Mark as Ticked',
          action: () => {},
          command: '⌘ ⇧ U',
        },
        more: {
          hasDivider: true,
          title: 'More',
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Tick all',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Untick all',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Move ticked to bottom',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Remove ticked',
              hasDivider: false,
              action: () => {},
            },
          ],
        },
        moveListItems: {
          title: 'Move List Items',
          hasDivider: true,
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Up',
              hasDivider: false,
              action: () => {},
              command: '⌥ ⌘ ↑',
            },
            {
              title: 'Down',
              hasDivider: false,
              action: () => {},
              command: '⌥ ⌘ ↓',
            },
          ],
        },
        table: {
          title: 'Table',
          hasDivider: false,
          action: () => {},
        },
        convertToText: {
          title: 'Convert to Text',
          hasDivider: false,
          action: () => {},
        },
        reverseTableDirection: {
          title: 'Reverse Table Direction',
          hasDivider: true,
          action: () => {},
        },
        showNoteAsLightBackground: {
          title: 'Show Note as Light Background',
          hasDivider: true,
          action: () => {},
        },
        font: {
          title: 'Font',
          hasDivider: false,
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Show Fonts',
              hasDivider: false,
              action: () => {},
              command: '⌘ T',
            },
            {
              title: 'Bold',
              hasDivider: false,
              action: () => {},
              command: '⌘ B',
            },
            {
              title: 'Italic',
              hasDivider: false,
              action: () => {},
              command: '⌘ I',
            },
            {
              title: 'Underline',
              hasDivider: false,
              action: () => {},
              command: '⌘ U',
            },
            {
              title: 'Strikethrough',
              hasDivider: true,
              action: () => {},
              command: '⌘ ⇧ X',
            },
            {
              title: 'Bigger',
              hasDivider: false,
              action: () => {},
              command: '⌘ +',
            },
            {
              title: 'Smaller',
              hasDivider: true,
              action: () => {},
              command: '⌘ -',
            },
            {
              title: 'Baseline',
              hasDivider: true,
              action: () => {},
              command: '>',
            },
            {
              title: 'Show Colors',
              hasDivider: true,
              action: () => {},
              command: '⌘ ⇧ C',
            },
            {
              title: 'Copy Style',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Paste Style',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Remove style',
              hasDivider: false,
              action: () => {},
            },
          ],
        },
        text: {
          title: 'Text',
          hasDivider: false,
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Align Left',
              hasDivider: false,
              action: () => {},
              command: '⌘ {',
            },
            {
              title: 'Center',
              hasDivider: false,
              action: () => {},
              command: '⌘ |',
            },
            {
              title: 'Justify',
              hasDivider: false,
              action: () => {},
              command: '⌘ :',
            },
            {
              title: 'Align Right',
              hasDivider: false,
              action: () => {},
              command: '⌘ }',
            },
            {
              title: 'Writing Direction',
              hasDivider: true,
              action: () => {},
              command: '>',
            },
          ],
        },
        indentation: {
          title: 'Indentation',
          hasDivider: false,
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Increase',
              hasDivider: false,
              action: () => {},
              command: '⌘ ]',
            },
            {
              title: 'Decrease',
              hasDivider: false,
              action: () => {},
              command: '⌘ [',
            },
          ],
        },
      },
    },
    {
      type: 'normal',
      title: 'View',
      items: {
        asList: {
          hasDivider: false,
          title: 'As List',
          action: () => {},
          command: '⌘ 1',
        },
        asGallery: {
          hasDivider: true,
          title: 'As Gallery',
          action: () => {},
          command: '⌘ 2',
        },
        sortBy: {
          hasDivider: false,
          title: 'Sort By',
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'Title',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Date Created',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Date Modified',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Date Opened',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Date Locked',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Date Shared',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Date Pinned',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Date Ticked',
              hasDivider: false,
              action: () => {},
            },
          ],
        },
        groupByDate: {
          hasDivider: false,
          title: 'Group By Date',
          action: () => {},
          command: '>',
          subSubtree: [
            {
              title: 'None',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Day',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Month',
              hasDivider: false,
              action: () => {},
            },
            {
              title: 'Year',
              hasDivider: false,
              action: () => {},
            },
          ],
        },
        hideFolders: {
          hasDivider: false,
          title: 'Hide Folders',
          action: () => {},
          command: '',
        },
        showNotesCount: {
          hasDivider: false,
          title: 'Show Notes Count',
          action: () => {},
        },
        attachmentView: {
          hasDivider: true,
          title: 'Attachment View',
          action: () => {},
        },
        showAttachmentBrowser: {
          title: 'Show Attachment Browser',
          hasDivider: false,
          action: () => {},
        },
        showInNote: {
          title: 'Show in Note',
          hasDivider: true,
          action: () => {},
        },
        showHighlights: {
          title: 'Show Highlights',
          hasDivider: false,
          action: () => {},
        },
        showNoteActivity: {
          title: 'Show Note Activity',
          hasDivider: false,
          action: () => {},
        },
        showFolderActivity: {
          title: 'Show Folder Activity',
          hasDivider: true,
          action: () => {},
        },
        zoomIn: {
          title: 'Zoom In',
          hasDivider: false,
          action: () => {},
          command: '⌘ +',
        },
        zoomOut: {
          title: 'Zoom Out',
          hasDivider: false,
          action: () => {},
          command: '⌘ -',
        },
        actualSize: {
          title: 'Actual Size',
          hasDivider: true,
          action: () => {},
        },
        previousNote: {
          title: 'Previous Note',
          hasDivider: false,
          action: () => {},
          command: '⌘ ]',
        },
        nextNote: {
          title: 'Next Note',
          hasDivider: true,
          action: () => {},
          command: '⌘ [',
        },
        hideToolbar: {
          title: 'Hide Toolbar',
          hasDivider: false,
          action: () => {},
        },
        customizeToolbar: {
          title: 'Customize Toolbar...',
          hasDivider: true,
          action: () => {},
        },
        enterFullScreen: {
          title: 'Enter Full Screen',
          hasDivider: false,
          action: () => {},
          command: '⌃ ⌘ F',
        },
      },
    },
    {
      type: 'normal',
      title: 'Window',
      items: {
        minimize: {
          title: 'Minimize',
          hasDivider: false,
          action: () => {},
          command: '⌘ M',
        },
        zoom: {
          title: 'Zoom',
          hasDivider: false,
          action: () => {},
          command: '⌥ ⌘ Z',
        },
        moveWindowToLeftSideOfScreen: {
          title: 'Move Window to Left Side of Screen',
          hasDivider: false,
          action: () => {},
        },
        moveWindowToRightSideOfScreen: {
          title: 'Move Window to Right Side of Screen',
          hasDivider: false,
          action: () => {},
        },
        replaceTiledWindow: {
          title: 'Replace Tiled Window',
          hasDivider: true,
          action: () => {},
        },
        removeWindowFromSet: {
          title: 'Remove Window from Set',
          hasDivider: false,
          action: () => {},
        },
        keepOnTop: {
          title: 'Keep on Top',
          hasDivider: true,
          action: () => {},
        },
        notes: {
          title: 'Notes',
          hasDivider: false,
          action: () => {},
        },
        photoBrowser: {
          title: 'Photo Browser',
          hasDivider: true,
          action: () => {},
        },
        bringAllToFront: {
          title: 'Bring All to Front',
          hasDivider: false,
          action: () => {},
        },
      },
    },
    {
      type: 'normal',
      title: 'Help',
      items: {
        notesHelp: {
          title: 'Notes Help',
          hasDivider: true,
          action: () => {},
        },
        usingTags: {
          title: 'Using Tags',
          hasDivider: false,
          action: () => {},
        },
        usingSmartFolders: {
          title: 'Using Smart Folders',
          hasDivider: false,
          action: () => {},
        },
      },
    },
  ],
};

export const options = NOTES;
