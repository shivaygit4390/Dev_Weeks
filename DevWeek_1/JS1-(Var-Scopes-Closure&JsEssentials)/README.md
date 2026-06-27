# JS1 Revision Guide

## Covers

- stack vs heap
- garbage collection awareness
- var, let, const
- scope and closures
- shallow vs deep copy
- prototypes and prototype chain
- call, apply, bind
- JSON stringify/parse limits
- object vs array mental model

---

## Read Order

1. `JS0-Memory.md`
2. `Js1-Var-Scopes-Closures.md`
3. `Js2-Shallow&Deep_Copy.md`
4. `Js3-ProtoType&PrototypeChain.md`
5. `Js4-Call_Apply_Bind.md`
6. `JSON-stringify-parse.md`
7. `ObjectVsArray.md`

---

## Practice Companion

Open the practice guide in:

- `Practice(closures&memory)/README.md`

That folder is where this theory becomes sticky in memory.

---

## Must Be Able To Explain

- how primitives and references behave differently
- why closure still works after the outer function ends
- shallow copy vs deep copy in real bugs
- how property lookup walks the prototype chain
- difference between `call`, `apply`, and `bind`
- why `JSON.parse(JSON.stringify(obj))` is not always a safe deep copy

---

## Done When

- you can explain each note in 2 to 3 lines
- you can connect memory, scope, and closure together
- you can solve or trace the practice files without heavy dependency on notes
