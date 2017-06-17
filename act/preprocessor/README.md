# Preprocessor Guide
This guide explains the preprocessor written to preprocess the JavaScript source code within [vitals][vitals]. It was created to give you (and [vitals][vitals]) more flexible composability, clearer source code, and better navigational constructs (e.g. automatic [VIM folds][vim-fold] and [grep-ready][grep-guide] source code). With little effort, it could become a stand-alone project, receive a shiny new public API, and be made compatible with almost any other programming language under the sun. Thoughts and feedback appreciated.
<br><br>

## GOTO
- [Preprocessor Language][lang]
  - [Components][comps]
  - [Commands][cmds]
  - [Syntax Rules][rules]
- [Special Terms][terms]
  - [Root Command][root]
  - [Open Command][open]
  - [Close Command][close]
- [Group Commands][grps]
  - [Block Command][block]
  - [Conditional Command][conditional]
  - [Define Command][define]
- [Reference Commands][refs]
  - [Include Command][include]
  - [Insert Command][insert]
- [Command Wrappers][cmd-wraps]
  - [Block Class][blk]
  - [Conditional Class][cond]
  - [Define Class][def]
  - [Include Class][incl]
  - [Insert Class][ins]
- [File System Wrappers][fs-wraps]
  - [Directory Class][dir]
  - [File Class][file]
  - [Line Class][line]
<br>


<a name="language"></a>
# Preprocessor Language
The preprocessor language has a simple layout and structure. It is built upon a single syntax option called a **command**. A command is always one line. Each command consists of four to five basic **components**: the [comment][comment], [action][action], [tag][tag], [ID][id], and [path][path]. With few variations these components comprise the five **command types** available: the [block][block], [conditional][conditional], [define][define], [include][include], and [insert][insert]. The types are separated into two **command type categories**: [group commands][grps] and [reference commands][refs]. The [group commands][grps] create *scopes* of source code (e.g. JavaScript for this implementation) that are assigned referable names (e.g. the [tag][tag] and [ID][id]). They can be enabled or disabled, included into other files, or inserted into multiple locations throughout your source code. The [reference commands][refs] are the directives that allow you to include or insert assigned [group][grps] scopes into other files and locations within your source. All remaining details are explained and illustrated below.
<br><br>

<a name="command-components"></a>
## The 5 Components of a Command
1. <a name="comment-component"></a>[**Comment**][rule2]

          ---
          /// #action @tag ID ../path/to/file.js
          ---

2. <a name="action-component"></a>[**Action**][rule3]

              -------
          /// #action @tag ID ../path/to/file.js
              -------

3. <a name="tag-component"></a>[**Tag**][rule5]

                      ----
          /// #action @tag ID ../path/to/file.js
                      ----

4. <a name="id-component"></a>[**ID**][rule6]

                           --
          /// #action @tag ID ../path/to/file.js
                           --

5. <a name="path-component"></a>[**Path**][rule7]

                              ------------------
          /// #action @tag ID ../path/to/file.js
                              ------------------

<br>

<a name="commands"></a>
## The 5 Commands
1. [**Block Commands**][block]

          /// #{{{ @tag ID
          /// #}}} @tag ID

2. [**Conditional Commands**][conditional]

          /// #if{{{ @tag ID
          /// #if}}} @tag ID
          /// #ifnot{{{ @tag ID
          /// #ifnot}}} @tag ID

3. [**Define Commands**][define]

          /// #def{{{ @tag ID
          /// #def}}} @tag ID

4. [**Include Commands**][include]

          /// #include @tag ID ../path/to/file.js

5. [**Insert Commands**][insert]

          /// #insert @tag ID ../path/to/file.js
          /// #insert @tag ID

<br>

<a name="command-rules"></a>
## The 7 Syntax Rules
1. <a name="command-rule-1"></a>**No Sharing**

    A preprocessor command must NOT share a line with any other syntax (e.g. JavaScript or JSDoc).

2. <a name="command-rule-2"></a>**Start With 3**

    A preprocessor command must start with a [comment][comment] component. A [comment][comment] component consists of three *forward slashes*, `"///"`, followed by at least one *space* or *tab* character, `" "`. The [comment][comment] component may only be preceded by *space* or *tab* characters.

3. <a name="command-rule-3"></a>**Hash It**

    A preprocessor command must use a *hash* character, `"#"`, to start the [action][action] component. It must follow the [comment][comment] component's *space* or *tab* character(s) (e.g. `"/// #"`).

4. <a name="command-rule-4"></a>**Action Time**

    A preprocessor command must act with an [action][action] component. The command type is denoted by the [action][action]. The desired [action][action] syntax must be specified immediately after the *hash* character followed by at least one *space* or *tab* character (e.g. `" #if{{{ "` and `" #include "`). See the [sections][cmds] designated for each command type to get details regarding the specific [action][action] syntax required for each command.

5. <a name="command-rule-5"></a>**Tag It**

    A preprocessor commmand must be tagged with a [tag][tag] component. A [tag][tag] component follows the [action][action] and must start with an *at* character, `"@"`, followed by your choice of [tag][tag] name (only *alphanumerics*, *underscores*, *periods*, and *dashes* allowed) and at least one *space* or *tab* character (e.g. `" @tag "` or `"#def}}} @tag "`).

6. <a name="command-rule-6"></a>**ID It**

    A preprocessor commmand must be a hipster with the [ID][id] component. The [ID][id] must be assigned after the [tag][tag]. It may only contain *alphanumerics*, *underscores*, *periods*, *dashes*, and *dollar signs* (e.g. `"@tag ID"`) and must be unique to all other command [ID][id] names with the SAME [tag][tag] name and within the SAME file or [group][grp] command *scope* (i.e. if you want to give two commands in the same *scope* the same [ID][id], you must give them different [tag][tag] names).

7. <a name="command-rule-7"></a>**Give Directions**

    A [reference][refs] command must give directions with a [path][path] component to refer to a command in another file. The [path][path] component must follow the *space* or *tab* character(s) after the [ID][id] component (e.g. `"ID ../path/to/file.js"`). The [path][path] may be a relative or absolute file path. If it is a relative file path, it is relative to the file containing the command (not the *cwd*). Note that *spaces*, *tabs*, and *pipes*, `"|"`, are illegal file path characters.

<br>

<a name="command-terms"></a>
# Special Command Terms
The following three sections explain terms that are refered to as commands throughout the guide, but are NOT actual command types. Hopefully these terms do not cause you any confusion (let me know if they do).
<br><br>

<a name="root-command"></a>
## Root Command
When the term *root command*, *command root*, or *root scope* in respect to a *command* (i.e. not a directory or file root scope) is used, it refers to the [group][grps] command that is at the root scope of a file (i.e. a command that is NOT defined within the scope of another [group][grps] command). Note that [include][include] commands may be a *root command*, but they do NOT contain the included [block][block] within their *root scope* (i.e. they do NOT alter the *root command* state of the included [block][block] command -- an included *root command* will always maintain its *root command* status for its original parent file).
<br><br>

<a name="open-command"></a>
## Open Command
The [open][open] command starts a new [group][grps]. All three [group][grps] commands use three opening curly brackets, `"{{{"`, at the end of their [action][action] to denote an [open][open] command.

        /// #def{{{ @tag id
        
          /// #{{{ @tag id
<br>

<a name="close-command"></a>
## Close Command
The [close][close] command ends an existing [group][grps]. All three [group][grps] commands require that each opened [group][grps] must be closed within their parent [group][grps] command's scope if they have one (e.g. [root commands][root] have no parent command) and that the [tag][tag] and [ID][id] of the [close][close] command EXACTLY match that of the [open][open] command. All three [group][grps] commands use three closing curly brackets, `"}}}"`, at the end of their [action][action] to denote a [close][close] command.


          /// #if}}} @tag id
        
        /// #}}} @tag id
<br>

<a name="group-commands"></a>
# Group Commands
[Group][grps] commands allow you to assign scopes to lines of source code and other preprocessor commands. They can be flexibly enabled or disabled (e.g. [conditionals][conditional]) or [referenced][refs] from other file or [command][root] root scopes (i.e. to avoid infinite loops and to keep things simple you cannot reference [groups][grps] assigned within the same [root command][root]). Every [group][grps] command requires matching [open][open] and [close][close] commands. Dangling (i.e. unclosed) [open][open] commands and [group][grps] commands that are NOT closed within their parent command scope will throw an error.
<br><br>

<a name="block-command"></a>
## Block Command
The [block][block] command is a general [group][grps] command that may be [included][include] only from other file scopes (i.e. unlike the [define][define] command that can be [inserted][insert] from within the same file that they were assigned in, the [block][block] command may NOT be [included][include] from within the same file that they were assigned in).

<a name="block-actions"></a>

| Open Action | Close Action |
|:------------|:-------------|
| `"#{{{"`    | `"#}}}"`     |
<br>

<a name="conditional-command"></a>
## Conditional Command
The [conditional][conditional] command is a special [group][grps] command that shows or hides its the content of its scope based upon the [state][file-run-state] `object` passed to [File.prototype.run][file-run] (i.e. it can be easily enabled or disabled at will). Currently, it may NOT be [referenced][refs] from within other file or [command][root] root scopes.

<a name="conditional-actions"></a>

| Open Action   | Close Action  |
|:--------------|:--------------|
| `"#if{{{"`    | `"#if}}}"`    |
| `"#ifnot{{{"` | `"#ifnot}}}"` |
<br>

<a name="define-command"></a>
## Define Command
The [define][define] command is a special [group][grps] command for creating simple C-like macros. [Define][define] commands must be defined in the root scope of a file and before all other command types (excluding commands contained by another [define][define]). They are the only [group][grps] command that is allowed to contain unbalanced or dangling commands (i.e. [open][open] commands without a matching [close][close] command) because the content of their scope is [inserted][insert] (instead of [included][include]) before the parsing stage (errors will be thrown during the parsing stage if unbalanced commands are not balanced after all [define][define] commands have been [inserted][insert]). [Define][define] commands may NOT CONTAIN other [define][define] or [insert][insert] commands. They may be [inserted][insert] from all file or command scopes (including commands from the same file) and may be [inserted][insert] any number of times. Note that the content of a [define][define] command is NOT considered a part of their parent file during the parsing stage (i.e. it must be [inserted][insert] for its content to exist in the preprocessed results).

<a name="define-actions"></a>

| Open Action | Close Action |
|:------------|:-------------|
| `"#def{{{"` | `"#def}}}"`  |
<br>

<a name="reference-commands"></a>
# Reference Commands
[Reference][refs] commands allow you to use code from other file or [command][root] scopes.
<br><br>

<a name="include-command"></a>
## Include Command
The [include][include] command is a general [reference][refs] command that allows you to [include][include] the scoped content of a [block][block] command from another file's [root scope][root] into the preprocessed results of your current [file][file]. Note that [block][block] commands may only be [included][include] ONE TIME per file preprocessing (commands within disabled [conditionals][conditional] do not count, but commands within [included][include] or [inserted][insert] command scopes do), and may NOT be [included][include] if they are from the same file or the file of any parent [include][include] commands (i.e. you cannot [include][include] a [block][block] that contains a command that [includes][include] a [block][block] from the original file). An error will be thrown for all [include][include] loops.

<a name="include-actions"></a>

| Action       |
|:-------------|
| `"#include"` |
<br>

<a name="insert-command"></a>

## Insert Command
The [insert][insert] command is a special [reference][refs] command that allows you to [insert][insert] the content of any [define][define] command from any location (including commands from the same file scope) into any place within a file any number of times before any preprocessor parsing occurs (i.e. you can also safely assume that any [define][define] scoped [blocks][block], [conditionals][conditional], or [includes][include] will be parsed as if they were a part of the original file). Although it is not recommended, you can [insert][insert] illegal or unbalanced commands without throwing an error (at least not until the parsing stage). If you would like to [insert][insert] a [define][define] command from the same file, you do not need to add a [path component][path] when writing the [insert][insert] command.

<a name="insert-actions"></a>

| Action      |
|:------------|
| `"#insert"` |
<br>


<a name="cmd-wraps"></a>
# Command Wrappers

- [Block Class][blk]
  - [Blk Constructor][blk-new]
  - [Blk Instance Properties][blk-props]
  - [Blk.prototype.isClose][blk-is-close]
  - [Blk.prototype.setClose][blk-set-close]
- [Conditional Class][cond]
  - [Cond Constructor][cond-new]
  - [Cond Instance Properties][cond-props]
  - [Cond.prototype.isClose][cond-is-close]
  - [Cond.prototype.setClose][cond-set-close]
- [Define Class][def]
  - [Def Constructor][def-new]
  - [Def Instance Properties][def-props]
  - [Def.prototype.isClose][def-is-close]
  - [Def.prototype.setClose][def-set-close]
- [Include Class][incl]
  - [Incl Constructor][incl-new]
  - [Incl Instance Properties][incl-props]
- [Insert Class][ins]
  - [Ins Constructor][ins-new]
  - [Ins Instance Properties][ins-props]
<br>


<a name="blk"></a>
## Block Class
The [block class][blk], `Blk`, wraps each [block][block] command.

- [Blk Constructor][blk-new]
- [Blk Instance Properties][blk-props]
- [Blk.prototype.isClose][blk-is-close]
  - [Parameters][blk-is-close-params]
  - [Returns][blk-is-close-returns]
- [Blk.prototype.setClose][blk-set-close]
  - [Parameters][blk-set-close-params]
  - [Returns][blk-set-close-returns]
<br>

<a name="blk-constructor"></a>
## Blk Constructor
This method creates `Blk` instances. Use the `new` keyword when calling `Blk` (e.g. `blk = new Blk(line, file, cmd);`).

|    | Parameter                             | Data Type          | Description
|:---|:--------------------------------------|:-------------------|:------------
| 1  | <a name="blk-param-open"></a>open     | *`!Line`*          | The opening [Line][line] instance.
| 2  | <a name="blk-param-file"></a>file     | *`!File`*          | The parent [File][file] instance.
| 3  | <a name="blk-param-parent"></a>parent | *`(?Blk\|?Cond)=`* | The parent [Blk][blk] or [Cond][cond] instance.
<br>

<a name="blk-members"></a>
## Blk Instance Properties

| Property Name                            | Data Type                               | Description
|:-----------------------------------------|:----------------------------------------|:------------
| <a name="blk-member-type"></a>type       | *`!Object`*                             | A pointer to a unique `object` instance designated for the [Blk][blk] class.
| <a name="blk-member-tag"></a>tag         | *`string`*                              | The [Blk][blk] instance's [tag][blk-tag] name (e.g. `"/// #{{{ @tag id"`).
| <a name="blk-member-id"></a>id           | *`string`*                              | The [Blk][blk] instance's [ID][blk-id] name (e.g. `"/// #}}} @tag id"`).
| <a name="blk-member-key"></a>key         | *`string`*                              | The [Blk][blk] instance's *hashed* [key][blk-key] name (e.g. `"tag:id"`).
| <a name="blk-member-file"></a>file       | *`!File`*                               | A pointer to the parent [File][file] instance.
| <a name="blk-member-open"></a>open       | *`!Line`*                               | A pointer to opening [Line][line] instance.
| <a name="blk-member-close"></a>close     | *`!Line`*                               | A pointer to closing [Line][line] instance.
| <a name="blk-member-parent"></a>parent   | *`(?Blk\|?Cond)`*                       | A pointer to the parent [Blk][blk] or [Cond][cond] instance. It is `null` if it is at the root scope of the [File][file] instance (i.e. it becomes a [root scope][root-scope] *command*).
| <a name="blk-member-blks"></a>blks       | *`!Object<!Blk>`*                       | A hash map of all of the [Blk][blk] instances within the immediate scope of the [Blk][blk] instance. The *hashed* `object` key names combine each [Blk][blk] instance's [tag][blk-tag] and [ID][blk-id] with a colon separator (e.g. `"tag:id"`).
| <a name="blk-member-conds"></a>conds     | *`!Object<!Cond>`*                      | A hash map of all of the [Cond][cond] instances within the immediate scope of the [Blk][blk] instance. The *hashed* `object` key names combine each [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id] with a colon separator (e.g. `"tag:id"`).
| <a name="blk-member-incls"></a>incls     | *`!Object<!Incl>`*                      | A hash map of all of the [Incl][incl] instances within the immediate scope of the [Blk][blk] instance. The *hashed* `object` key names combine each [Incl][incl] instance's [tag][incl-tag] and [ID][incl-id] with a colon separator (e.g. `"tag:id"`).
| <a name="blk-member-content"></a>content | *`!Array<(!Line\|!Blk\|!Cond\|!Incl)>`* | An ordered `array` of all of the [Line][line], [Blk][blk], [Cond][cond], and [Incl][incl] instances within the immediate scope of the [Blk][blk] instance.
<br>

<a name="blk-prototype-is-close"></a>
## Blk.prototype.isClose
This method tests if a line of text is a valid closing [block][block] command and if it matches the [Blk][blk] instance's [tag][blk-tag] and [ID][blk-id].

<a name="blk-prototype-is-close-parameters"></a>
### Parameters

|    | Parameter                                            | Data Type  | Description
|:---|:-----------------------------------------------------|:-----------|:------------
| 1  | <a name="blk-prototype-is-close-param-text"></a>text | *`string`* | The text of a [Line][line] instance to check.

<a name="blk-prototype-is-close-returns"></a>
### Returns

| Data Type   | Description
|:------------|:------------
| *`boolean`* | [Blk.prototype.isClose][blk-is-close] returns the result of the [close][close] command test.
<br>

<a name="blk-prototype-set-close"></a>
## Blk.prototype.setClose
This method sets the [close][blk-close] property for the [Blk][blk] instance.

<a name="blk-prototype-set-close-parameters"></a>
### Parameters

|    | Parameter                                               | Data Type | Description
|:---|:--------------------------------------------------------|:----------|:------------
| 1  | <a name="blk-prototype-set-close-param-close"></a>close | *`!Line`* | The closing [Line][line] instance.

<a name="blk-prototype-set-close-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [Blk.prototype.setClose][blk-set-close] does not return a value.
<br>


<a name="conditional"></a>
## Conditional Class
The [conditional class][cond], `Cond`, wraps each [conditional][conditional] command.

- [Cond Constructor][cond-new]
- [Cond Instance Properties][cond-props]
- [Cond.prototype.isClose][cond-is-close]
  - [Parameters][cond-is-close-params]
  - [Returns][cond-is-close-returns]
- [Cond.prototype.setClose][cond-set-close]
  - [Parameters][cond-set-close-params]
  - [Returns][cond-set-close-returns]
<br>

<a name="cond-constructor"></a>
## Cond Constructor
This method creates `Cond` instances. Use the `new` keyword when calling `Cond` (e.g. `cond = new Cond(line, file, cmd);`).

|    | Parameter                              | Data Type          | Description
|:---|:---------------------------------------|:-------------------|:------------
| 1  | <a name="cond-param-open"></a>open     | *`!Line`*          | The opening [Line][line] instance.
| 2  | <a name="cond-param-file"></a>file     | *`!File`*          | The parent [File][file] instance.
| 3  | <a name="cond-param-parent"></a>parent | *`(?Blk\|?Cond)=`* | The parent [Blk][blk] or [Cond][cond] instance.
<br>

<a name="cond-members"></a>
## Cond Instance Properties

| Property Name                             | Data Type                               | Description
|:------------------------------------------|:----------------------------------------|:------------
| <a name="cond-member-type"></a>type       | *`!Object`*                             | A pointer to a unique `object` instance designated for the [Cond][cond] class.
| <a name="cond-member-tag"></a>tag         | *`string`*                              | The [Cond][cond] instance's [tag][cond-tag] name (e.g. `"/// #if{{{ @tag id"`).
| <a name="cond-member-id"></a>id           | *`string`*                              | The [Cond][cond] instance's [ID][cond-id] name (e.g. `"/// #ifnot}}} @tag id"`).
| <a name="cond-member-key"></a>key         | *`string`*                              | The [Cond][cond] instance's *hashed* [key][cond-key] name (e.g. `"tag:id"`).
| <a name="cond-member-action"></a>action   | *`boolean`*                             | The [Cond][cond] instance's *action* type. The `"#if{{{"` *action* is `true`, and the `"#ifnot{{{"` *action* is `false`.
| <a name="cond-member-file"></a>file       | *`!File`*                               | A pointer to the parent [File][file] instance.
| <a name="cond-member-open"></a>open       | *`!Line`*                               | A pointer to opening [Line][line] instance.
| <a name="cond-member-close"></a>close     | *`!Line`*                               | A pointer to closing [Line][line] instance.
| <a name="cond-member-parent"></a>parent   | *`(?Blk\|?Cond)`*                       | A pointer to the parent [Blk][blk] or [Cond][cond] instance. It is `null` if it is at the root scope of the [File][file] instance (i.e. it becomes a [root scope][root-scope] *command*).
| <a name="cond-member-blks"></a>blks       | *`!Object<!Blk>`*                       | A hash map of all of the [Blk][blk] instances within the immediate scope of the [Cond][cond] instance. The *hashed* `object` key names combine each [Blk][blk] instance's [tag][blk-tag] and [ID][blk-id] with a colon separator (e.g. `"tag:id"`).
| <a name="cond-member-conds"></a>conds     | *`!Object<!Cond>`*                      | A hash map of all of the [Cond][cond] instances within the immediate scope of the [Cond][cond] instance. The *hashed* `object` key names combine each [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id] with a colon separator (e.g. `"tag:id"`).
| <a name="cond-member-incls"></a>incls     | *`!Object<!Incl>`*                      | A hash map of all of the [Incl][incl] instances within the immediate scope of the [Cond][cond] instance. The *hashed* `object` key names combine each [Incl][incl] instance's [tag][incl-tag] and [ID][incl-id] with a colon separator (e.g. `"tag:id"`).
| <a name="cond-member-content"></a>content | *`!Array<(!Line\|!Blk\|!Cond\|!Incl)>`* | An ordered `array` of all of the [Line][line], [Blk][blk], [Cond][cond], and [Incl][incl] instances within the immediate scope of the [Cond][cond] instance.
<br>

<a name="cond-prototype-is-close"></a>
## Cond.prototype.isClose
This method tests if a line of text is a valid closing [conditional][conditional] command and if it matches the [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id].

<a name="cond-prototype-is-close-parameters"></a>
### Parameters

|    | Parameter                                             | Data Type  | Description
|:---|:------------------------------------------------------|:-----------|:------------
| 1  | <a name="cond-prototype-is-close-param-text"></a>text | *`string`* | The text of a [Line][line] instance to check.

<a name="cond-prototype-is-close-returns"></a>
### Returns

| Data Type   | Description
|:------------|:------------
| *`boolean`* | [Cond.prototype.isClose][cond-is-close] returns the result of the [close][close] command test.
<br>

<a name="cond-prototype-set-close"></a>
## Cond.prototype.setClose
This method sets the [close][cond-close] property for the [Cond][cond] instance.

<a name="cond-prototype-set-close-parameters"></a>
### Parameters

|    | Parameter                                                | Data Type | Description
|:---|:---------------------------------------------------------|:----------|:------------
| 1  | <a name="cond-prototype-set-close-param-close"></a>close | *`!Line`* | The closing [Line][line] instance.

<a name="cond-prototype-set-close-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [Cond.prototype.setClose][cond-set-close] does not return a value.
<br>


<a name="def"></a>
## Define Class
The [define class][def], `Def`, wraps each [define][define] command.

- [Def Constructor][def-new]
- [Def Instance Properties][def-props]
- [Def.prototype.isClose][def-is-close]
  - [Parameters][def-is-close-params]
  - [Returns][def-is-close-returns]
- [Def.prototype.setClose][def-set-close]
  - [Parameters][def-set-close-params]
  - [Returns][def-set-close-returns]
<br>

<a name="def-constructor"></a>
## Def Constructor
This method creates `Def` instances. Use the `new` keyword when calling `Def` (e.g. `def = new Def(line, file);`).

|    | Parameter                         | Data Type | Description
|:---|:----------------------------------|:----------|:------------
| 1  | <a name="def-param-open"></a>open | *`!Line`* | The opening [Line][line] instance.
| 2  | <a name="def-param-file"></a>file | *`!File`* | The parent [File][file] instance.
<br>

<a name="def-members"></a>
## Def Instance Properties

| Property Name                        | Data Type         | Description
|:-------------------------------------|:------------------|:------------
| <a name="def-member-type"></a>type   | *`!Object`*       | A pointer to a unique `object` instance designated for the [Def][def] class.
| <a name="def-member-tag"></a>tag     | *`string`*        | The [Def][def] instance's [tag][def-tag] name (e.g. `"/// #{{{ @tag id"`).
| <a name="def-member-id"></a>id       | *`string`*        | The [Def][def] instance's [ID][def-id] name (e.g. `"/// #}}} @tag id"`).
| <a name="def-member-key"></a>key     | *`string`*        | The [Def][def] instance's *hashed* [key][def-key] name (e.g. `"tag:id"`).
| <a name="def-member-file"></a>file   | *`!File`*         | A pointer to the parent [File][file] instance.
| <a name="def-member-open"></a>open   | *`!Line`*         | A pointer to opening [Line][line] instance.
| <a name="def-member-close"></a>close | *`!Line`*         | A pointer to closing [Line][line] instance.
| <a name="def-member-lines"></a>lines | *`!Array<!Line>`* | An ordered `array` of all of the [Line][line] instances within the [Def][def] instance scope.
<br>

<a name="def-prototype-is-close"></a>
## Def.prototype.isClose
This method tests if a line of text is a valid closing [define][define] command and if it matches the [Def][def] instance's [tag][def-tag] and [ID][def-id].

<a name="def-prototype-is-close-parameters"></a>
### Parameters

|    | Parameter                                            | Data Type  | Description
|:---|:-----------------------------------------------------|:-----------|:------------
| 1  | <a name="def-prototype-is-close-param-text"></a>text | *`string`* | The text of a [Line][line] instance to check.

<a name="def-prototype-is-close-returns"></a>
### Returns

| Data Type   | Description
|:------------|:------------
| *`boolean`* | [Def.prototype.isClose][def-is-close] returns the result of the [close][close] *command* test.
<br>

<a name="def-prototype-set-close"></a>
## Def.prototype.setClose
This method sets the [close][def-close] property for the [Def][def] instance.

<a name="def-prototype-set-close-parameters"></a>
### Parameters

|    | Parameter                                               | Data Type | Description
|:---|:--------------------------------------------------------|:----------|:------------
| 1  | <a name="def-prototype-set-close-param-close"></a>close | *`!Line`* | The closing [Line][line] instance.

<a name="def-prototype-set-close-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [Def.prototype.setClose][def-set-close] does not return a value.
<br>


<a name="incl"></a>
## Include Class
The [include class][incl], `Incl`, wraps each [include][include] command.

- [Incl Constructor][incl-new]
- [Incl Instance Properties][incl-props]
<br>

<a name="incl-constructor"></a>
## Incl Constructor
This method creates `Incl` instances. Use the `new` keyword when calling `Incl` (e.g. `incl = new Incl(line, file, cmd);`).

|    | Parameter                              | Data Type          | Description
|:---|:---------------------------------------|:-------------------|:------------
| 1  | <a name="incl-param-line"></a>line     | *`!Line`*          | The defining [Line][line] instance.
| 2  | <a name="incl-param-file"></a>file     | *`!File`*          | The parent [File][file] instance.
| 3  | <a name="incl-param-parent"></a>parent | *`(?Blk\|?Cond)=`* | The parent [Blk][blk] or [Cond][cond] instance.
<br>

<a name="incl-members"></a>
## Incl Instance Properties

| Property Name                           | Data Type         | Description
|:----------------------------------------|:------------------|:------------
| <a name="incl-member-type"></a>type     | *`!Object`*       | A pointer to a unique `object` instance designated for the [Incl][incl] class.
| <a name="incl-member-tag"></a>tag       | *`string`*        | The [Incl][incl] instance's [tag][incl-tag] name (e.g. `"/// #include @tag id"`).
| <a name="incl-member-id"></a>id         | *`string`*        | The [Incl][incl] instance's [ID][incl-id] name (e.g. `"/// #include @tag id"`).
| <a name="incl-member-key"></a>key       | *`string`*        | The [Incl][incl] instance's *hashed* [key][incl-key] name (e.g. `"tag:id"`).
| <a name="incl-member-path"></a>path     | *`string`*        | The [Incl][incl] instance's [path][incl-path] value (e.g. `"/// #include @tag id ./path/to/file.js"`).
| <a name="incl-member-file"></a>file     | *`!File`*         | A pointer to the parent [File][file] instance.
| <a name="incl-member-line"></a>line     | *`!Line`*         | A pointer to defining [Line][line] instance.
| <a name="incl-member-parent"></a>parent | *`(?Blk\|?Cond)`* | A pointer to the parent [Blk][blk] or [Cond][cond] instance. It is `null` if it is at the root scope of the [File][file] instance (i.e. it becomes like a [root][root] [group][grps] *command*).
| <a name="incl-member-cmd"></a>cmd       | *`!Blk`*          | A pointer to the included [Blk][blk] instance.
<br>


<a name="ins"></a>
## Insert Class
The [insert class][ins], `Ins`, wraps each [insert][insert] command.

- [Ins Constructor][ins-new]
- [Ins Instance Properties][ins-props]
<br>

<a name="ins-constructor"></a>
## Ins Constructor
This method creates `Ins` instances. Use the `new` keyword when calling `Ins` (e.g. `ins = new Ins(line, 1, file);`).

|    | Parameter                           | Data Type  | Description
|:---|:------------------------------------|:-----------|:------------
| 1  | <a name="ins-param-line"></a>line   | *`!Line`*  | The defining [Line][line] instance.
| 2  | <a name="ins-param-index"></a>index | *`number`* | The index of the defining [Line][line] instance's place in the [File][file] instance's [lines][file-lines] `array`.
| 3  | <a name="ins-param-file"></a>file   | *`!File`*  | The parent [File][file] instance.
<br>

<a name="ins-members"></a>
## Ins Instance Properties

| Property Name                      | Data Type                   | Description
|:-----------------------------------|:----------------------------|:------------
| <a name="ins-member-type"></a>type | *`!Object`*                 | A pointer to a unique `object` instance designated for the [Ins][ins] class.
| <a name="ins-member-tag"></a>tag   | *`string`*                  | The [Ins][ins] instance's [tag][ins-tag] name (e.g. `"/// #insert @tag id"`).
| <a name="ins-member-id"></a>id     | *`string`*                  | The [Ins][ins] instance's [ID][ins-id] name (e.g. `"/// #insert @tag id"`).
| <a name="ins-member-key"></a>key   | *`string`*                  | The [Ins][ins] instance's *hashed* [key][ins-key] name (e.g. `"tag:id"`).
| <a name="ins-member-path"></a>path | *`string`*                  | The [Ins][ins] instance's [path][ins-path] value (e.g. `"/// #insert @tag id ./path/to/file.js"`).
| <a name="ins-member-file"></a>file | *`!File`*                   | A pointer to the parent [File][file] instance.
| <a name="ins-member-line"></a>line | *`!Line`*                   | A pointer to defining [Line][line] instance.
| <a name="ins-member-def"></a>def   | *`!Def`*                    | A pointer to the included [Def][def] instance.
| <a name="ins-member-args"></a>args | *`!Array<(number\|!Line)>`* | The [Function.prototype.apply][apply] *argsArray* value to [splice][splice] from the parent [File][file] instance's [lines][file-lines] `array`.
<br>


<a name="file-system-wrappers"></a>
## File System Wrappers
Each file-system class wraps a different file-system component for the preprocessor.

- [Directory Class][dir]
  - [Dir Constructor][dir-new]
  - [Dir Instance Properties][dir-props]
  - [Dir.prototype.load][dir-load]
  - [Dir.prototype.preparse][dir-preparse]
  - [Dir.prototype.parse][dir-parse]
  - [Dir.prototype.run][dir-run]
- [File Class][file]
  - [File Constructor][file-new]
  - [File Instance Properties][file-props]
  - [File.prototype.load][file-load]
  - [File.prototype.preparse][file-preparse]
  - [File.prototype.parse][file-parse]
  - [File.prototype.run][file-run]
- [Line Class][line]
  - [Line Constructor][line-new]
  - [Line Instance Properties][line-props]
  - [Line.prototype.setAfter][line-set-after]
<br>


<a name="dir"></a>
## Directory Class
The [directory class][dir], `Dir`, wraps each directory node within the *src* tree.

- [Dir Constructor][dir-new]
- [Dir Instance Properties][dir-props]
- [Dir.prototype.load][dir-load]
  - [Parameters][dir-load-params]
  - [Returns][dir-load-returns]
- [Dir.prototype.preparse][dir-preparse]
  - [Parameters][dir-preparse-params]
  - [Returns][dir-preparse-returns]
- [Dir.prototype.parse][dir-parse]
  - [Parameters][dir-parse-params]
  - [Returns][dir-parse-returns]
- [Dir.prototype.run][dir-run]
  - [Parameters][dir-run-params]
  - [Returns][dir-run-returns]
<br>

<a name="dir-constructor"></a>
## Dir Constructor
This method creates `Dir` instances. Use the `new` keyword when calling `Dir` (e.g. `dir = new Dir("path/to/directory");`).

|    | Parameter                             | Data Type  | Description
|:---|:--------------------------------------|:-----------|:------------
| 1  | <a name="dir-param-path"></a>path     | *`string`* | The file path to the directory node being wrapped. The directory path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory).
| 2  | <a name="dir-param-parent"></a>parent | *`?Dir=`*  | The parent [Dir][dir] instance. This parameter is required for all [Dir][dir] instances except for the root [Dir][dir] instance (i.e. since the root instance is the only exposed instance, this parameter is not a part of the public API).
<br>

<a name="dir-members"></a>
## Dir Instance Properties

| Property Name                          | Data Type                  | Description
|:---------------------------------------|:---------------------------|:------------
| <a name="dir-member-type"></a>type     | *`!Object`*                | A pointer to a unique `object` instance designated for the [Dir][dir] class.
| <a name="dir-member-name"></a>name     | *`string`*                 | The [Dir][dir] instance's directory name.
| <a name="dir-member-tree"></a>tree     | *`string`*                 | The [Dir][dir] instance's directory path relative to the root [Dir][dir] instance (`"./"` not included). A forward slash is appended to the end of every [Dir][dir] instance tree except for the root [Dir][dir] instance which has an empty tree.
| <a name="dir-member-path"></a>path     | *`string`*                 | The [Dir][dir] instance's absolute directory path.
| <a name="dir-member-parent"></a>parent | *`?Dir`*                   | A pointer to the [Dir][dir] instance's parent [Dir][dir] instance. It is `null` if it is the root [Dir][dir] instance.
| <a name="dir-member-dirs"></a>dirs     | *`!Object<string, !Dir>`*  | A hash map of all of the child [Dir][dir] instances within the [Dir][dir] instance. Each [Dir][dir] instance's [name][dir-name] is used for each `object` key.
| <a name="dir-member-files"></a>files   | *`!Object<string, !File>`* | A hash map of all of the child [File][file] instances within the [Dir][dir] instance. Each [File][file] instance's [name][file-name] is used for each `object` key.
<br>

<a name="dir-prototype-load"></a>
## Dir.prototype.load
This method triggers [Dir.prototype.load][dir-load] for each [Dir][dir] instance within the [dirs][dir-dirs] `array` and [File.prototype.load][file-load] for each [File][file] instance within the [files][dir-files] `array`.

<a name="dir-prototype-load-parameters"></a>
### Parameters
[Dir.prototype.load][dir-load] has no parameters.

<a name="dir-prototype-load-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [Dir.prototype.load][dir-load] does not return a value.
<br>

<a name="dir-prototype-preparse"></a>
## Dir.prototype.preparse
This method triggers [Dir.prototype.preparse][dir-preparse] for each [Dir][dir] instance within the [dirs][dir-dirs] `array` and [File.prototype.preparse][file-preparse] for each [File][file] instance within the [files][dir-files] `array`.

<a name="dir-prototype-preparse-parameters"></a>
### Parameters
[Dir.prototype.preparse][dir-preparse] has no parameters.

<a name="dir-prototype-preparse-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [Dir.prototype.preparse][dir-preparse] does not return a value.
<br>

<a name="dir-prototype-parse"></a>
## Dir.prototype.parse
This method triggers [Dir.prototype.parse][dir-parse] for each [Dir][dir] instance within the [dirs][dir-dirs] `array` and [File.prototype.parse][file-parse] for each [File][file] instance within the [files][dir-files] `array`.

<a name="dir-prototype-parse-parameters"></a>
### Parameters
[Dir.prototype.parse][dir-parse] has no parameters.

<a name="dir-prototype-parse-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [Dir.prototype.parse][dir-parse] does not return a value.
<br>

<a name="dir-prototype-run"></a>
## Dir.prototype.run
This method triggers [File.prototype.run][file-run] for the [File][file] instance that matches the file path defined by the [src][dir-run-src] parameter.

<a name="dir-prototype-run-parameters"></a>
### Parameters

|    | Parameter                                         | Data Type                        | Description
|:---|:--------------------------------------------------|:---------------------------------|:------------
| 1  | <a name="dir-prototype-run-param-src"></a>src     | *`string`*                       | The file path to the source [File][file] instance you want to call [File.prototype.run][file-run] from. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE [Dir][dir] instance (i.e. since only the root [Dir][dir] instance is called from the exposed API, it is essentially relative to the root [Dir][dir] instance).
| 2  | <a name="dir-prototype-run-param-dest"></a>dest   | *`string`*                       | The file path to the destination you want to save the preprocessed result of [File.prototype.run][file-run]. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory). The directory path up to the file name of the resolved [dest][dir-run-dest] path must already exist. If a file exists at the resolved [dest][dir-run-dest] path, it is overwritten.
| 3  | <a name="dir-prototype-run-param-state"></a>state | *`!Object<string, boolean>`*     | The enabled, `true`, or disabled, `false`, state for every [conditional command][cond] defined within the [src][dir-run-src] [File][file] instance's [content][file-content] `array`. Each [state][dir-run-state] `object` key must be *hashed* (i.e. created) by combining each [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id] with a colon, `":"`, separating them (e.g. `"tag:id"`). EVERY CONDITIONAL within the [src][dir-run-src] MUST BE DEFINED in the [state][dir-run-state] or an error will be thrown.
| 4  | <a name="dir-prototype-run-param-alter"></a>alter | *`(!function(string): string)=`* | The [alter][dir-run-alter] `function` is optional. If it is defined, it allows you to provide custom alterations to the preprocessed result of [File.prototype.run][file-run] before it is saved to the [dest][dir-run-dest].

<a name="dir-prototype-run-returns"></a>
### Returns

| Data Type   | Description
|:------------|:------------
| *`string`*  | [Dir.prototype.run][dir-run] returns the preprocessed result (UTF-8 encoded) that is saved to the [dest][dir-run-dest].
<br>


<a name="file"></a>
## File Class
The [file class][file], `File`, wraps each file node within the *src* tree.

- [File Constructor][file-new]
- [File Instance Properties][file-props]
- [File.prototype.load][file-load]
  - [Parameters][file-load-params]
  - [Returns][file-load-returns]
- [File.prototype.preparse][file-preparse]
  - [Parameters][file-preparse-params]
  - [Returns][file-preparse-returns]
- [File.prototype.parse][file-parse]
  - [Parameters][file-parse-params]
  - [Returns][file-parse-returns]
- [File.prototype.run][file-run]
  - [Parameters][file-run-params]
  - [Returns][file-run-returns]
<br>

<a name="file-constructor"></a>
## File Constructor
This method creates `File` instances. Use the `new` keyword when calling `File` (e.g. `file = new File("path/to/file.js", dir);`).

|    | Parameter                              | Data Type  | Description
|:---|:---------------------------------------|:-----------|:------------
| 1  | <a name="file-param-path"></a>path     | *`string`* | The file path to the file node being wrapped. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory).
| 2  | <a name="file-param-parent"></a>parent | *`!Dir`*   | The parent [Dir][dir] instance.
<br>

<a name="file-members"></a>
## File Instance Properties

| Property Name                             | Data Type                               | Description
|:------------------------------------------|:----------------------------------------|:------------
| <a name="file-member-type"></a>type       | *`!Object`*                             | A pointer to a unique `object` instance designated for the [File][file] class.
| <a name="file-member-name"></a>name       | *`string`*                              | The [File][file] instance's file name.
| <a name="file-member-tree"></a>tree       | *`string`*                              | The [File][file] instance's file path relative to the root [Dir][dir] instance (`"./"` not included).
| <a name="file-member-path"></a>path       | *`string`*                              | The [File][file] instance's absolute file path.
| <a name="file-member-parent"></a>parent   | *`!Dir`*                                | A pointer to the [File][file] instance's parent [Dir][dir] instance.
| <a name="file-member-lines"></a>lines     | *`!Array<!Line>`*                       | An ordered `array` of all of the [Line][line] instances within the [File][file] instance scope (i.e. each [Ins][ins] modifies this property).
| <a name="file-member-defs"></a>defs       | *`!Object<string, !Def>`*               | A hash map of all of the [Def][def] instances within the scope of the [File][file] instance. The *hashed* `object` key names combine each [Def][def] instance's [tag][def-tag] and [ID][def-id] with a colon separator (e.g. `"tag:id"`).
| <a name="file-member-blks"></a>blks       | *`!Object<string, !Blk>`*               | A hash map of all of the [Blk][blk] instances within the root scope of the [File][file] instance. The *hashed* `object` key names combine each [Blk][blk] instance's [tag][blk-tag] and [ID][blk-id] with a colon separator (e.g. `"tag:id"`).
| <a name="file-member-conds"></a>conds     | *`!Object<string, !Cond>`*              | A hash map of all of the [Cond][cond] instances within the root scope of the [File][file] instance. The *hashed* `object` key names combine each [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id] with a colon separator (e.g. `"tag:id"`).
| <a name="file-member-incls"></a>incls     | *`!Object<string, !Incl>`*              | A hash map of all of the [Incl][incl] instances within the root scope of the [File][file] instance. The *hashed* `object` key names combine each [Incl][incl] instance's [tag][incl-tag] and [ID][incl-id] with a colon separator (e.g. `"tag:id"`).
| <a name="file-member-inserts"></a>inserts | *`!Array<!Ins>`*                        | An ordered `array` of all of the [Ins][ins] instances within the [File][file] instance.
| <a name="file-member-content"></a>content | *`!Array<(!Line\|!Blk\|!Cond\|!Incl)>`* | An ordered `array` of all of the [Line][line], [Blk][blk], [Cond][cond], and [Incl][incl] instances within the root scope of the [File][file] instance.
<br>

<a name="file-prototype-load"></a>
## File.prototype.load
This method causes the [File][file] instance's [path][file-path] to be read, a new [Line][line] instance to be constructed and pushed to the [File][file] instance's [lines][file-lines] `array` for each line within the [File][file], a new [Def][def] instance to be constructed and defined in the [File][file] instance's [defs][file-defs] `object` for each [Def][def] within the [File][file], and each [Line][line] within the [lines][def-lines] `array` of each [Def][def] instance to be spliced from the [File][file] instance's [lines][file-lines] `array`.

<a name="file-prototype-load-parameters"></a>
### Parameters
[File.prototype.load][file-load] has no parameters.

<a name="file-prototype-load-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [File.prototype.load][file-load] does not return a value.
<br>

<a name="file-prototype-preparse"></a>
## File.prototype.preparse
This method causes a new [Ins][ins] instance to be constructed and pushed to the [File][file] instance's [inserts][file-inserts] `array` for each [Ins][ins] within the [File][file], each [Ins][ins] instance's [line][ins-line] property's [Line][line] instance to spliced from the [File][file] instance's [lines][file-lines] `array`, and each [Line][line] instance from each [Ins][ins] instance's [lines][ins-lines] `array` to be spliced to the [File][file] instance's [lines][file-lines] `array`.

<a name="file-prototype-preparse-parameters"></a>
### Parameters
[File.prototype.preparse][file-preparse] has no parameters.

<a name="file-prototype-preparse-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [File.prototype.preparse][file-preparse] does not return a value.
<br>

<a name="file-prototype-parse"></a>
## File.prototype.parse
This method causes a new [Blk][blk], [Cond][cond], or [Incl][incl] instance to be constructed and defined in the [File][file] instance's [blks][file-blks], [conds][file-conds], or [incls][file-incls] `object` for each [Blk][blk], [Cond][cond], and [Incl][incl] within the root scope of the [File][file] instance and the [File][file] instance's [content][file-content] `array` to be filled (in order of appearance) with each [Line][line], [Blk][blk], [Cond][cond], and [Incl][incl] within the root scope of the [File][file] instance.

<a name="file-prototype-parse-parameters"></a>
### Parameters
[File.prototype.parse][file-parse] has no parameters.

<a name="file-prototype-parse-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [File.prototype.parse][file-parse] does not return a value.
<br>

<a name="file-prototype-run"></a>
## File.prototype.run
This method runs the preprocessor on a parsed [File][file] instance and saves the result to a [destination][file-run-dest] file.

<a name="file-prototype-run-parameters"></a>
### Parameters

|    | Parameter                                          | Data Type                        | Description
|:---|:---------------------------------------------------|:---------------------------------|:------------
| 1  | <a name="file-prototype-run-param-dest"></a>dest   | *`string`*                       | The file path to the destination that you want to save the preprocessed results to. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory). The directory path up to the file name of the resolved [dest][file-run-dest] path must already exist. If a file exists at the resolved [dest][file-run-dest] path, it is overwritten.
| 2  | <a name="file-prototype-run-param-state"></a>state | *`!Object<string, boolean>`*     | The enabled, `true`, or disabled, `false`, state for every [conditional command][cond] defined within the [File][file] instance's [content][file-content] `array`. Each [state][file-run-state] `object` key must be *hashed* (i.e. created) by combining each [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id] with a colon, `":"`, separating them (e.g. `"tag:id"`). EVERY CONDITIONAL within the [File][file] MUST BE DEFINED in the [state][file-run-state] or an error will be thrown.
| 3  | <a name="file-prototype-run-param-alter"></a>alter | *`(!function(string): string)=`* | The [alter][file-run-alter] `function` is optional. If it is defined, it allows you to provide custom alterations to the preprocessed result before it is saved to the [dest][file-run-dest].

<a name="file-prototype-run-returns"></a>
### Returns

| Data Type   | Description
|:------------|:------------
| *`string`*  | [File.prototype.run][file-run] returns the preprocessed result (UTF-8 encoded) that is saved to the [dest][file-run-dest].
<br>


<a name="line"></a>
## Line Class
The [line class][line], `Line`, wraps each line of text within every [File][file] instance.

- [Line Constructor][line-new]
- [Line Instance Properties][line-props]
- [Line.prototype.setAfter][line-set-after]
  - [Parameters][line-set-after-params]
  - [Returns][line-set-after-returns]
<br>

<a name="line-constructor"></a>
## Line Constructor
This method creates `Line` instances. Use the `new` keyword when calling `Line` (e.g. `line = new Line("line-text", 1, file);`).

|    | Parameter                                | Data Type  | Description
|:---|:-----------------------------------------|:-----------|:------------
| 1  | <a name="line-param-text"></a>text       | *`string`* | The UTF-8 encoded text for the new [Line][line].
| 2  | <a name="line-param-linenum"></a>linenum | *`number`* | The line `number` relative to its original parent [File][file].
| 3  | <a name="line-param-file"></a>file       | *`!File`*  | The original parent [File][file] instance.
<br>

<a name="line-members"></a>
## Line Instance Properties

| Property Name                                           | Data Type   | Description
|:--------------------------------------------------------|:------------|:------------
| <a name="line-member-type"></a>type                     | *`!Object`* | A pointer to a unique `object` instance designated for the [Line][line] class.
| <a name="line-member-text"></a>text                     | *`string`*  | The [Line][line] instance's original UTF-8 encoded text. Note that all end-of-line characters (e.g. line-feeds and carriage-returns) are trimmed.
| <a name="line-member-before"></a>before                 | *`!Object`* | The original line data (i.e. before the [load][file-load] and [preparse][file-preparse] stages).
| <a name="line-member-before-file"></a>before.file       | *`!File`*   | A pointer to the original parent [File][file] instance of the [Line][line] instance.
| <a name="line-member-before-linenum"></a>before.linenum | *`number`*  | A positive `integer` (i.e. a whole `number` greater than `0`) representing the [Line][line] instance's original position within its original parent [File][file] instance's context. Note that the first [linenum][line-before-linenum] in a [File][file] is `1` (i.e. one-based).
| <a name="line-member-after"></a>after                   | *`!Object`* | The preparsed line data (i.e. after the [load][file-load] and [preparse][file-preparse] stages).
| <a name="line-member-after-file"></a>after.file         | *`!File`*   | A pointer to the preparsed parent [File][file] instance of the [Line][line] instance.
| <a name="line-member-after-linenum"></a>after.linenum   | *`number`*  | A positive `integer` (i.e. a whole `number` greater than `0`) representing the [Line][line] instance's new position within its preparsed parent [File][file] instance's context. Note that the first [linenum][line-after-linenum] in a [File][file] is `1` (i.e. one-based).
<br>

<a name="line-prototype-set-after"></a>
## Line.prototype.setAfter
This method sets the [after][line-after] `object` for the [Line][line] instance.

<a name="line-prototype-set-after-parameters"></a>
### Parameters

|    | Parameter                                                    | Data Type  | Description
|:---|:-------------------------------------------------------------|:-----------|:------------
| 1  | <a name="line-prototype-set-after-param-linenum"></a>linenum | *`number`* | The line `number` relative to its preparsed parent [File][file].
| 2  | <a name="line-prototype-set-after-param-file"></a>file       | *`!File`*  | The preparsed parent [File][file] instance.

<a name="line-prototype-set-after-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [Line.prototype.setAfter][line-set-after] does not return a value.
<br>


[vitals]: https://github.com/imaginate/vitals

[vim]: http://www.vim.org/
[vim-fold]: https://www.linux.com/learn/vim-tips-folding-fun
[vimdoc-fold]: http://vimdoc.sourceforge.net/htmldoc/fold.html

[grep]: https://www.gnu.org/software/grep/
[grep-docs]: https://www.gnu.org/software/grep/manual/html_node/index.html
[grep-guide]: https://www.linux.com/learn/getting-grip-gnu-grep

[apply]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
[splice]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

[lang]: #user-content-preprocessor-language
[comps]: #user-content-command-components
[rules]: #user-content-command-rules
[terms]: #user-content-command-terms
[cmds]: #user-content-commands
[grps]: #user-content-group-commands
[refs]: #user-content-reference-commands

[comment]: #user-content-comment-component
[action]: #user-content-action-component
[tag]: #user-content-tag-component
[id]: #user-content-id-component
[path]: #user-content-path-component

[rule1]: #user-content-command-rule-1
[rule2]: #user-content-command-rule-2
[rule3]: #user-content-command-rule-3
[rule4]: #user-content-command-rule-4
[rule5]: #user-content-command-rule-5
[rule6]: #user-content-command-rule-6
[rule7]: #user-content-command-rule-7

[root]: #user-content-root-command
[open]: #user-content-open-command
[close]: #user-content-close-command

[block]: #user-content-block-command
[conditional]: #user-content-conditional-command
[define]: #user-content-define-command
[include]: #user-content-include-command
[insert]: #user-content-insert-command

[block-action]: #user-content-block-actions
[conditional-action]: #user-content-conditional-actions
[define-action]: #user-content-define-actions
[include-action]: #user-content-include-actions
[insert-action]: #user-content-insert-actions

[cmd-wraps]: #user-content-command-wrappers
[fs-wraps]: #user-content-file-system-wrappers

[blk]: #user-content-blk
[cond]: #user-content-cond
[def]: #user-content-def
[incl]: #user-content-incl
[ins]: #user-content-ins
[dir]: #user-content-dir
[file]: #user-content-file
[line]: #user-content-line

[blk-new]: #user-content-blk-constructor
[blk-new-open]: #user-content-blk-param-open
[blk-new-file]: #user-content-blk-param-file
[blk-new-parent]: #user-content-blk-param-parent

[cond-new]: #user-content-cond-constructor
[cond-new-open]: #user-content-cond-param-open
[cond-new-file]: #user-content-cond-param-file
[cond-new-parent]: #user-content-cond-param-parent

[def-new]: #user-content-def-constructor
[def-new-open]: #user-content-def-param-open
[def-new-file]: #user-content-def-param-file

[incl-new]: #user-content-incl-constructor
[incl-new-line]: #user-content-incl-param-line
[incl-new-file]: #user-content-incl-param-file
[incl-new-parent]: #user-content-incl-param-parent

[ins-new]: #user-content-ins-constructor
[ins-new-line]: #user-content-ins-param-line
[ins-new-index]: #user-content-ins-param-index
[ins-new-file]: #user-content-ins-param-file

[dir-new]: #user-content-dir-constructor
[dir-new-path]: #user-content-dir-param-path
[dir-new-parent]: #user-content-dir-param-parent

[file-new]: #user-content-file-constructor
[file-new-path]: #user-content-file-param-path
[file-new-parent]: #user-content-file-param-parent

[line-new]: #user-content-line-constructor
[line-new-text]: #user-content-line-param-text
[line-new-index]: #user-content-line-param-index
[line-new-file]: #user-content-line-param-file

[blk-members]: #user-content-blk-members
[blk-props]: #user-content-blk-members
[blk-type]: #user-content-blk-member-type
[blk-tag]: #user-content-blk-member-tag
[blk-id]: #user-content-blk-member-id
[blk-key]: #user-content-blk-member-key
[blk-file]: #user-content-blk-member-file
[blk-open]: #user-content-blk-member-open
[blk-close]: #user-content-blk-member-close
[blk-parent]: #user-content-blk-member-parent
[blk-blks]: #user-content-blk-member-blks
[blk-conds]: #user-content-blk-member-conds
[blk-incls]: #user-content-blk-member-incls
[blk-content]: #user-content-blk-member-content

[cond-members]: #user-content-cond-members
[cond-props]: #user-content-cond-members
[cond-type]: #user-content-cond-member-type
[cond-tag]: #user-content-cond-member-tag
[cond-id]: #user-content-cond-member-id
[cond-key]: #user-content-cond-member-key
[cond-action]: #user-content-cond-member-action
[cond-file]: #user-content-cond-member-file
[cond-open]: #user-content-cond-member-open
[cond-close]: #user-content-cond-member-close
[cond-parent]: #user-content-cond-member-parent
[cond-blks]: #user-content-cond-member-blks
[cond-conds]: #user-content-cond-member-conds
[cond-incls]: #user-content-cond-member-incls
[cond-content]: #user-content-cond-member-content

[def-members]: #user-content-def-members
[def-props]: #user-content-def-members
[def-type]: #user-content-def-member-type
[def-tag]: #user-content-def-member-tag
[def-id]: #user-content-def-member-id
[def-key]: #user-content-def-member-key
[def-file]: #user-content-def-member-file
[def-open]: #user-content-def-member-open
[def-close]: #user-content-def-member-close
[def-lines]: #user-content-def-member-lines

[incl-members]: #user-content-incl-members
[incl-props]: #user-content-incl-members
[incl-type]: #user-content-incl-member-type
[incl-tag]: #user-content-incl-member-tag
[incl-id]: #user-content-incl-member-id
[incl-key]: #user-content-incl-member-key
[incl-path]: #user-content-incl-member-path
[incl-file]: #user-content-incl-member-file
[incl-line]: #user-content-incl-member-line
[incl-parent]: #user-content-incl-member-parent
[incl-cmd]: #user-content-incl-member-cmd

[ins-members]: #user-content-ins-members
[ins-props]: #user-content-ins-members
[ins-type]: #user-content-ins-member-type
[ins-tag]: #user-content-ins-member-tag
[ins-id]: #user-content-ins-member-id
[ins-key]: #user-content-ins-member-key
[ins-path]: #user-content-ins-member-path
[ins-file]: #user-content-ins-member-file
[ins-line]: #user-content-ins-member-line
[ins-def]: #user-content-ins-member-def
[ins-args]: #user-content-ins-member-args

[dir-members]: #user-content-dir-members
[dir-props]: #user-content-dir-members
[dir-type]: #user-content-dir-member-type
[dir-name]: #user-content-dir-member-name
[dir-tree]: #user-content-dir-member-tree
[dir-path]: #user-content-dir-member-path
[dir-parent]: #user-content-dir-member-parent
[dir-dirs]: #user-content-dir-member-dirs
[dir-files]: #user-content-dir-member-files

[file-members]: #user-content-file-members
[file-props]: #user-content-file-members
[file-type]: #user-content-file-member-type
[file-name]: #user-content-file-member-name
[file-tree]: #user-content-file-member-tree
[file-path]: #user-content-file-member-path
[file-parent]: #user-content-file-member-parent
[file-lines]: #user-content-file-member-lines
[file-defs]: #user-content-file-member-defs
[file-blks]: #user-content-file-member-blks
[file-conds]: #user-content-file-member-conds
[file-incls]: #user-content-file-member-incls
[file-inserts]: #user-content-file-member-inserts
[file-content]: #user-content-file-member-content

[line-members]: #user-content-line-members
[line-props]: #user-content-line-members
[line-type]: #user-content-line-member-type
[line-text]: #user-content-line-member-text
[line-before]: #user-content-line-member-before
[line-before-file]: #user-content-line-member-before-file
[line-before-linenum]: #user-content-line-member-before-linenum
[line-after]: #user-content-line-member-after
[line-after-file]: #user-content-line-member-after-file
[line-after-linenum]: #user-content-line-member-after-linenum

[blk-is-close]: #user-content-blk-prototype-is-close
[blk-is-close-params]: #user-content-blk-prototype-is-close-parameters
[blk-is-close-text]: #user-content-blk-prototype-is-close-param-text
[blk-is-close-returns]: #user-content-blk-prototype-is-close-returns

[blk-set-close]: #user-content-blk-prototype-set-close
[blk-set-close-params]: #user-content-blk-prototype-set-close-parameters
[blk-set-close-close]: #user-content-blk-prototype-set-close-param-close
[blk-set-close-returns]: #user-content-blk-prototype-set-close-returns

[cond-is-close]: #user-content-cond-prototype-is-close
[cond-is-close-params]: #user-content-cond-prototype-is-close-parameters
[cond-is-close-text]: #user-content-cond-prototype-is-close-param-text
[cond-is-close-returns]: #user-content-cond-prototype-is-close-returns

[cond-set-close]: #user-content-cond-prototype-set-close
[cond-set-close-params]: #user-content-cond-prototype-set-close-parameters
[cond-set-close-close]: #user-content-cond-prototype-set-close-param-close
[cond-set-close-returns]: #user-content-cond-prototype-set-close-returns

[def-is-close]: #user-content-def-prototype-is-close
[def-is-close-params]: #user-content-def-prototype-is-close-parameters
[def-is-close-text]: #user-content-def-prototype-is-close-param-text
[def-is-close-returns]: #user-content-def-prototype-is-close-returns

[def-set-close]: #user-content-def-prototype-set-close
[def-set-close-params]: #user-content-def-prototype-set-close-parameters
[def-set-close-close]: #user-content-def-prototype-set-close-param-close
[def-set-close-returns]: #user-content-def-prototype-set-close-returns

[dir-load]: #user-content-dir-prototype-load
[dir-load-params]: #user-content-dir-prototype-load-parameters
[dir-load-returns]: #user-content-dir-prototype-load-returns

[dir-preparse]: #user-content-dir-prototype-preparse
[dir-preparse-params]: #user-content-dir-prototype-preparse-parameters
[dir-preparse-returns]: #user-content-dir-prototype-preparse-returns

[dir-parse]: #user-content-dir-prototype-parse
[dir-parse-params]: #user-content-dir-prototype-parse-parameters
[dir-parse-returns]: #user-content-dir-prototype-parse-returns

[dir-run]: #user-content-dir-prototype-run
[dir-run-params]: #user-content-dir-prototype-run-parameters
[dir-run-returns]: #user-content-dir-prototype-run-returns
[dir-run-src]: #user-content-dir-prototype-run-param-src
[dir-run-dest]: #user-content-dir-prototype-run-param-dest
[dir-run-state]: #user-content-dir-prototype-run-param-state
[dir-run-alter]: #user-content-dir-prototype-run-param-alter

[file-load]: #user-content-file-prototype-load
[file-load-params]: #user-content-file-prototype-load-parameters
[file-load-returns]: #user-content-file-prototype-load-returns

[file-preparse]: #user-content-file-prototype-preparse
[file-preparse-params]: #user-content-file-prototype-preparse-parameters
[file-preparse-returns]: #user-content-file-prototype-preparse-returns

[file-parse]: #user-content-file-prototype-parse
[file-parse-params]: #user-content-file-prototype-parse-parameters
[file-parse-returns]: #user-content-file-prototype-parse-returns

[file-run]: #user-content-file-prototype-run
[file-run-params]: #user-content-file-prototype-run-parameters
[file-run-dest]: #user-content-file-prototype-run-param-dest
[file-run-state]: #user-content-file-prototype-run-param-state
[file-run-alter]: #user-content-file-prototype-run-param-alter
[file-run-returns]: #user-content-file-prototype-run-returns

[line-set-after]: #user-content-line-prototype-set-after
[line-set-after-params]: #user-content-line-prototype-set-after-parameters
[line-set-after-linenum]: #user-content-line-prototype-set-after-param-linenum
[line-set-after-file]: #user-content-line-prototype-set-after-param-file
[line-set-after-returns]: #user-content-line-prototype-set-after-returns

