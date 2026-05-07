'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { books, type Book } from '@/lib/books';
import styles from './BookLibrary.module.css';

type Comment = {
  id: string;
  name: string;
  text: string;
  createdAt: string;
};

type Draft = { name: string; text: string };

const emptyDraft: Draft = { name: '', text: '' };

function readComments(bookId: string): Comment[] {
  try {
    const raw = window.localStorage.getItem(`comments_${bookId}`);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (c): c is Comment =>
        typeof c === 'object' &&
        c !== null &&
        typeof (c as Comment).id === 'string' &&
        typeof (c as Comment).name === 'string' &&
        typeof (c as Comment).text === 'string' &&
        typeof (c as Comment).createdAt === 'string',
    );
  } catch {
    return [];
  }
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function BookLibrary() {
  const [flippedBookId, setFlippedBookId] = useState<string | null>(null);
  const [commentsByBook, setCommentsByBook] = useState<Record<string, Comment[]>>({});
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});

  useEffect(() => {
    const initial: Record<string, Comment[]> = {};
    for (const book of books) {
      initial[book.id] = readComments(book.id);
    }
    setCommentsByBook(initial);
  }, []);

  function flip(bookId: string) {
    setFlippedBookId((prev) => (prev === bookId ? null : bookId));
  }

  function updateDraft(bookId: string, key: keyof Draft, value: string) {
    setDrafts((prev) => ({
      ...prev,
      [bookId]: { ...(prev[bookId] ?? emptyDraft), [key]: value },
    }));
  }

  function handleSubmit(book: Book, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const draft = drafts[book.id] ?? emptyDraft;
    const name = draft.name.trim();
    const text = draft.text.trim();
    if (!name || !text) return;

    const newComment: Comment = {
      id: makeId(),
      name,
      text,
      createdAt: new Date().toISOString(),
    };
    const updated = [...(commentsByBook[book.id] ?? []), newComment];

    setCommentsByBook((prev) => ({ ...prev, [book.id]: updated }));
    setDrafts((prev) => ({ ...prev, [book.id]: emptyDraft }));

    try {
      window.localStorage.setItem(`comments_${book.id}`, JSON.stringify(updated));
    } catch {
      // storage may be unavailable (private mode, quota); UI keeps optimistic state
    }
  }

  return (
    <div
      className={`card ${styles.bookLibrary}`}
      role="region"
      aria-labelledby="book-library-title"
    >
      <h3 id="book-library-title" className={styles.title}>
        Meine Bibliothek
      </h3>
      <p className={styles.intro}>
        Bücher, die meinen Blick auf Lernen, Disziplin und Leben geprägt haben.
      </p>

      <div className={styles.cardList}>
        {books.map((book) => {
          const isFlipped = flippedBookId === book.id;
          const comments = commentsByBook[book.id] ?? [];
          const draft = drafts[book.id] ?? emptyDraft;
          const canSubmit =
            draft.name.trim().length > 0 && draft.text.trim().length > 0;
          const innerClass = `${styles.flipCardInner} ${
            isFlipped ? styles.isFlipped : ''
          }`.trim();

          return (
            <article key={book.id} className={styles.flipCard}>
              <div className={innerClass}>
                <div className={styles.flipCardFace}>
                  <header className={styles.bookHeader}>
                    <h4 className={styles.bookTitle}>{book.title}</h4>
                    <span className={styles.bookAuthor}>{book.author}</span>
                  </header>

                  <div className={styles.quotes}>
                    {book.quotes.map((quote, index) => (
                      <blockquote key={index} className={styles.quote}>
                        {quote.text}
                      </blockquote>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => flip(book.id)}
                    className={styles.discussToggle}
                  >
                    💬 Diskutieren
                    {comments.length > 0 ? ` (${comments.length})` : ''}
                  </button>
                </div>

                <div className={`${styles.flipCardFace} ${styles.flipCardBack}`}>
                  <header className={styles.backHeader}>
                    <h4 className={styles.backTitle}>Diskutieren</h4>
                    <button
                      type="button"
                      onClick={() => flip(book.id)}
                      className={styles.backLink}
                    >
                      ← Zurück
                    </button>
                  </header>

                  <ul className={styles.commentList}>
                    {comments.length === 0 ? (
                      <li className={styles.commentEmpty}>
                        Noch keine Kommentare. Sei der Erste!
                      </li>
                    ) : (
                      comments.map((c) => (
                        <li key={c.id} className={styles.comment}>
                          <span className={styles.commentName}>{c.name}</span>
                          <p className={styles.commentText}>{c.text}</p>
                        </li>
                      ))
                    )}
                  </ul>

                  <form
                    className={styles.commentForm}
                    onSubmit={(event) => handleSubmit(book, event)}
                  >
                    <div className={styles.field}>
                      <label
                        className={styles.fieldLabel}
                        htmlFor={`name-${book.id}`}
                      >
                        Name
                      </label>
                      <input
                        id={`name-${book.id}`}
                        type="text"
                        className={styles.input}
                        value={draft.name}
                        onChange={(e) =>
                          updateDraft(book.id, 'name', e.target.value)
                        }
                        required
                        maxLength={60}
                      />
                    </div>
                    <div className={styles.field}>
                      <label
                        className={styles.fieldLabel}
                        htmlFor={`text-${book.id}`}
                      >
                        Kommentar
                      </label>
                      <textarea
                        id={`text-${book.id}`}
                        className={styles.textarea}
                        value={draft.text}
                        onChange={(e) =>
                          updateDraft(book.id, 'text', e.target.value)
                        }
                        required
                        rows={3}
                        maxLength={500}
                      />
                    </div>
                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={!canSubmit}
                    >
                      Senden
                    </button>
                  </form>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
