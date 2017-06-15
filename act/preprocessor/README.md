# Preprocessor Classes & Syntax Specs
This guide describes every preprocessor class, defines each member and method of every class, and provides descriptive details for the preprocessor syntax within the source. It is likely that this preprocessor will become its own separate project in the future. Thoughts and feedback appreciated.
<br><br>

## GOTO
- [File System Wrappers][fs]
  - [Directory Class][dir]
  - [File Class][file]
  - [Line Class][line]
- [Source Syntax][syntax]
  - [Group Commands][grps]
    - [Block Command][blk]
    - [Conditional Command][cond]
    - [Define Command][def]
  - [Reference Commands][refs]
    - [Include Command][incl]
    - [Insert Command][ins]
<br>

<a name="fs"></a>
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
<br>

[fs]: #user-content-fs
[dir]: #user-content-dir
[file]: #user-content-file
[line]: #user-content-line
[dir-new]: #user-content-dir-constructor
[file-new]: #user-content-file-constructor
[line-new]: #user-content-line-constructor
[dir-props]: #user-content-dir-members
[file-props]: #user-content-file-members
[line-props]: #user-content-line-members
[dir-load]: #user-content-dir-prototype-load
[dir-preparse]: #user-content-dir-prototype-preparse
[dir-parse]: #user-content-dir-prototype-parse
[dir-run]: #user-content-dir-prototype-run
[file-load]: #user-content-file-prototype-load
[file-preparse]: #user-content-file-prototype-preparse
[file-parse]: #user-content-file-prototype-parse
[file-run]: #user-content-file-prototype-run
[dir-load-params]: #user-content-dir-prototype-load-parameters
[dir-preparse-params]: #user-content-dir-prototype-preparse-parameters
[dir-parse-params]: #user-content-dir-prototype-parse-parameters
[dir-run-params]: #user-content-dir-prototype-run-parameters
[file-load-params]: #user-content-file-prototype-load-parameters
[file-preparse-params]: #user-content-file-prototype-preparse-parameters
[file-parse-params]: #user-content-file-prototype-parse-parameters
[file-run-params]: #user-content-file-prototype-run-parameters
[dir-load-returns]: #user-content-dir-prototype-load-returns
[dir-preparse-returns]: #user-content-dir-prototype-preparse-returns
[dir-parse-returns]: #user-content-dir-prototype-parse-returns
[dir-run-returns]: #user-content-dir-prototype-run-returns
[file-load-returns]: #user-content-file-prototype-load-returns
[file-preparse-returns]: #user-content-file-prototype-preparse-returns
[file-parse-returns]: #user-content-file-prototype-parse-returns
[file-run-returns]: #user-content-file-prototype-run-returns

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

|    | Parameter                                   | Data Type  | Description
|:---|:--------------------------------------------|:-----------|:------------
| 1  | <a name="dir-constructor-path"></a>path     | *`string`* | The file path to the directory node being wrapped. The directory path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory).
| 2  | <a name="dir-constructor-parent"></a>parent | *`?Dir=`*  | The parent [Dir][dir] instance. This parameter is required for all [Dir][dir] instances except for the root [Dir][dir] instance (i.e. since the root instance is the only exposed instance, this parameter is not a part of the public API).
<br>

[dir-new-path]: #user-content-dir-constructor-path
[dir-new-parent]: #user-content-dir-constructor-parent

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

[dir-type]: #user-content-dir-member-type
[dir-name]: #user-content-dir-member-name
[dir-tree]: #user-content-dir-member-tree
[dir-path]: #user-content-dir-member-path
[dir-parent]: #user-content-dir-member-parent
[dir-dirs]: #user-content-dir-member-dirs
[dir-files]: #user-content-dir-member-files

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

|    | Parameter                                   | Data Type                        | Description
|:---|:--------------------------------------------|:---------------------------------|:------------
| 1  | <a name="dir-prototype-run-src"></a>src     | *`string`*                       | The file path to the source [File][file] instance you want to call [File.prototype.run][file-run] from. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE [Dir][dir] instance (i.e. since only the root [Dir][dir] instance is called from the exposed API, it is essentially relative to the root [Dir][dir] instance).
| 2  | <a name="dir-prototype-run-dest"></a>dest   | *`string`*                       | The file path to the destination you want to save the preprocessed result of [File.prototype.run][file-run]. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory). The directory path up to the file name of the resolved [dest][dir-run-dest] path must already exist. If a file exists at the resolved [dest][dir-run-dest] path, it is overwritten.
| 3  | <a name="dir-prototype-run-state"></a>state | *`!Object<string, boolean>`*     | The enabled, `true`, or disabled, `false`, state for every [conditional command][cond] defined within the [src][dir-run-src] [File][file] instance's [content][file-content] `array`. Each [state][dir-run-state] `object` key must be *hashed* (i.e. created) by combining each [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id] with a colon, `":"`, separating them (e.g. `"tag:id"`). EVERY CONDITIONAL within the [src][dir-run-src] MUST BE DEFINED in the [state][dir-run-state] or an error will be thrown.
| 4  | <a name="dir-prototype-run-alter"></a>alter | *`(!function(string): string)=`* | The [alter][dir-run-alter] `function` is optional. If it is defined, it allows you to provide custom alterations to the preprocessed result of [File.prototype.run][file-run] before it is saved to the [dest][dir-run-dest].

[dir-run-src]: #user-content-dir-prototype-run-src
[dir-run-dest]: #user-content-dir-prototype-run-dest
[dir-run-state]: #user-content-dir-prototype-run-state
[dir-run-alter]: #user-content-dir-prototype-run-alter

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

|    | Parameter                                    | Data Type  | Description
|:---|:---------------------------------------------|:-----------|:------------
| 1  | <a name="file-constructor-path"></a>path     | *`string`* | The file path to the file node being wrapped. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory).
| 2  | <a name="file-constructor-parent"></a>parent | *`!Dir`*   | The parent [Dir][dir] instance.
<br>

[file-new-path]: #user-content-file-constructor-path
[file-new-parent]: #user-content-file-constructor-parent

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

|    | Parameter                                    | Data Type                        | Description
|:---|:---------------------------------------------|:---------------------------------|:------------
| 1  | <a name="file-prototype-run-dest"></a>dest   | *`string`*                       | The file path to the destination that you want to save the preprocessed results to. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory). The directory path up to the file name of the resolved [dest][file-run-dest] path must already exist. If a file exists at the resolved [dest][file-run-dest] path, it is overwritten.
| 2  | <a name="file-prototype-run-state"></a>state | *`!Object<string, boolean>`*     | The enabled, `true`, or disabled, `false`, state for every [conditional command][cond] defined within the [File][file] instance's [content][file-content] `array`. Each [state][file-run-state] `object` key must be *hashed* (i.e. created) by combining each [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id] with a colon, `":"`, separating them (e.g. `"tag:id"`). EVERY CONDITIONAL within the [File][file] MUST BE DEFINED in the [state][file-run-state] or an error will be thrown.
| 3  | <a name="file-prototype-run-alter"></a>alter | *`(!function(string): string)=`* | The [alter][file-run-alter] `function` is optional. If it is defined, it allows you to provide custom alterations to the preprocessed result before it is saved to the [dest][file-run-dest].

[file-run-dest]: #user-content-file-prototype-run-dest
[file-run-state]: #user-content-file-prototype-run-state
[file-run-alter]: #user-content-file-prototype-run-alter

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
<br>

<a name="line-constructor"></a>
## Line Constructor
This method creates `Line` instances. Use the `new` keyword when calling `Line` (e.g. `line = new Line("line-text", 1, file);`).

|    | Parameter                                      | Data Type  | Description
|:---|:-----------------------------------------------|:-----------|:------------
| 1  | <a name="line-constructor-text"></a>text       | *`string`* | The UTF-8 encoded text for the new [Line][line].
| 2  | <a name="line-constructor-linenum"></a>linenum | *`number`* | The line `number` relative to its parent [File][file].
| 3  | <a name="line-constructor-file"></a>file       | *`!File`*  | The parent [File][file] instance.
<br>

[line-new-text]: #user-content-line-constructor-text
[line-new-index]: #user-content-line-constructor-index
[line-new-file]: #user-content-line-constructor-file

<a name="line-members"></a>
## Line Instance Properties

| Property Name                             | Data Type   | Description
|:------------------------------------------|:------------|:------------
| <a name="line-member-type"></a>type       | *`!Object`* | A pointer to a unique `object` instance designated for the [Line][line] class.
| <a name="line-member-file"></a>file       | *`!File`*   | A pointer to the parent [File][file] instance of the [Line][line] instance.
| <a name="line-member-text"></a>text       | *`string`*  | The [Line][line] instance's original UTF-8 encoded text. Note that all end-of-line characters (e.g. line-feeds and carriage-returns) are trimmed.
| <a name="line-member-linenum"></a>linenum | *`number`*  | A positive `integer` (i.e. a whole `number` greater than `0`) representing the [Line][line] instance's original position within its [file][line-file] property's [File][file] instance's context. Note that the first [linenum][line-linenum] in a [File][file] is `1` (i.e. one-based).
<br>

[line-type]: #user-content-line-member-type
[line-file]: #user-content-line-member-file
[line-text]: #user-content-line-member-text
[line-linenum]: #user-content-line-member-linenum


<a name="syntax"></a>
## Source Syntax
The preprocessor syntax has a simple layout and structure. It is built upon a single option, the *command*. A *command* is always one line. It is based upon one pattern with few variations to comprise the five total syntax *command* types available. The five *command* types are separated into two general types, [groups][grps] and [references][refs]. The [group commands][grps] create *scopes* of code (e.g. JavaScript) that can be enabled or disabled and be re-used. The [reference commands][refs] reference [groups][grps] of code from outside *scopes* (e.g. other [files][file]) to give you more flexible composability with any programming language (although for now, it is only JavaScript, but that is easy to change). All of the *commands* consist of four basic syntax components, and both of the [reference][refs] *command* types have a fifth.

### The 5 Commands
##### The Group Commands
1. <p><strong><a href="#user-content-blk">Blocks</a></strong></p>
2. <p><strong><a href="#user-content-cond">Conditionals</a></strong></p>
3. <p><strong><a href="#user-content-def">Defines</a></strong></p>
##### The Reference Commands
4. <p><strong><a href="#user-content-incl">Includes</a></strong></p>
5. <p><strong><a href="#user-content-ins">Inserts</a></strong></p>

### The 5 Command Components
1. <p><strong><a href="#user-content-cmd-rule2">Comment</a></strong></p>
2. <p><strong><a href="#user-content-cmd-rule3">Action</a></strong></p>
3. <p><strong><a href="#user-content-cmd-rule5">Tag</a></strong></p>
4. <p><strong><a href="#user-content-cmd-rule6">ID</a></strong></p>
5. <p><strong><a href="#user-content-cmd-rule7">Path</a></strong></p>

### The 7 Command Rules
1. <p><a name="cmd-rule1"></a><strong>No Sharing</strong></p><p>A preprocessor <em>command</em> must NOT share a line with any other syntax (e.g. JavaScript or JSDoc).</p>
2. <p><a name="cmd-rule2"></a><strong>Start With 3</strong></p><p>A preprocessor <em>command</em> must start with a <em>comment</em> component. A <em>comment</em> component consists of three forward slashes, <code>"///"</code>, followed by at least one space or tab character, <code>" "</code>. The <em>comment</em> component may only be preceded by space or tab characters.</p>
3. <p><a name="cmd-rule3"></a><strong>Hash It</strong></p><p>A preprocessor <em>command</em> must use a hash tag, <code>"#"</code>, to start the <em>action</em> component. It must follow the <em>comment</em> component's space or tab character(s) (e.g. <code>"/// #"</code>).</p>
4. <p><a name="cmd-rule4"></a><strong>Action Time</strong></p><p>A preprocessor <em>command</em> must act with an <em>action</em> component. The <em>command</em> type is defined by the <em>action</em>. The desired <em>action</em> syntax must be specified immediately after the hash tag followed by at least one space or tab character (e.g. <code>"/// #if{{{ "</code> or <code>"/// #include "</code>). See the <em>command</em> sections for each <em>command</em> type's <em>action</em> syntax.</p>
5. <p><a name="cmd-rule5"></a><strong>Tag It</strong></p><p>The preprocessor <em>commmand</em> must be tagged with a <em>tag</em> component. A <em>tag</em> component follows the <em>action</em> and must start with an at symbol, <code>"@"</code>, followed by your choice of <em>tag</em> name (only alphanumerics, underscores, dots, and dashes allowed) and at least one space or tab character (e.g. <code>"/// #insert @tagname "</code> or <code>"/// #def}}} @tag-name "</code>).</p>
6. <p><a name="cmd-rule6"></a><strong>ID It</strong></p><p>The preprocessor <em>commmand</em> must be a hipster with the <em>ID</em> component. The <em>ID</em> must be assigned after the <em>tag</em>. It may only contain alphanumerics, underscores, dots, dashes, and dollar signs (e.g. <code>"/// #{{{ @tagname uniqueID"</code>) and must be unique to all other <em>command IDs</em> with the SAME <em>tag</em> name and within the SAME <a href="#user-content-file">file</a> or <a href="#user-content-groups">group</a> <em>scope</em> (i.e. if you want to give two <em>commands</em> in the same <em>scope</em> the same <em>ID</em>, you must give them different <em>tag</em> names).</p>
7. <p><a name="cmd-rule7"></a><strong>Ref Directions</strong></p><p>The <a href="#user-content-refs">reference</a> <em>command</em> must give directions with a <em>path</em> component to use a <a href="#user-content-groups">group</a> within another <a href="#user-content-file">file</a>. The <em>path</em> component must follow the space or tab character(s) that follow the <em>ID</em> component and must be a relative file path (e.g. <code>"/// #include @tag ID ../path/to/file.js"</code>). Note that space and tab characters are not allowed within file paths.</p>
<br>

[syntax]: #user-content-syntax
[cmd-rule1]: #user-content-cmd-rule1
[cmd-rule2]: #user-content-cmd-rule2
[cmd-rule3]: #user-content-cmd-rule3
[cmd-rule4]: #user-content-cmd-rule4
[cmd-rule5]: #user-content-cmd-rule5
[cmd-rule6]: #user-content-cmd-rule6
[cmd-rule7]: #user-content-cmd-rule7
[root-scope]: #user-content-root-cmd-scope
[root-cmd]: #user-content-root-cmd-scope
[grps]: #user-content-groups
[grp]: #user-content-groups
[open-cmd]: #user-content-open-cmd
[close-cmd]: #user-content-close-cmd
[refs]: #user-content-refs
[ref]: #user-content-refs
[blk]: #user-content-blk
[cond]: #user-content-cond
[def]: #user-content-def
[incl]: #user-content-incl
[ins]: #user-content-ins
[blk-act]: #user-content-blk-actions
[cond-act]: #user-content-cond-actions
[def-act]: #user-content-def-actions
[incl-act]: #user-content-incl-actions
[ins-act]: #user-content-ins-actions
[blk-new]: #user-content-blk-constructor
[cond-new]: #user-content-cond-constructor
[def-new]: #user-content-def-constructor
[incl-new]: #user-content-incl-constructor
[ins-new]: #user-content-ins-constructor
[blk-props]: #user-content-blk-members
[cond-props]: #user-content-cond-members
[def-props]: #user-content-def-members
[incl-props]: #user-content-incl-members
[ins-props]: #user-content-ins-members
[blk-is-close]: #user-content-blk-prototype-is-close
[blk-set-close]: #user-content-blk-prototype-set-close
[cond-is-close]: #user-content-cond-prototype-is-close
[cond-set-close]: #user-content-cond-prototype-set-close
[def-is-close]: #user-content-def-prototype-is-close
[def-set-close]: #user-content-def-prototype-set-close
[blk-is-close-params]: #user-content-blk-prototype-is-close-parameters
[blk-set-close-params]: #user-content-blk-prototype-set-close-parameters
[cond-is-close-params]: #user-content-cond-prototype-is-close-parameters
[cond-set-close-params]: #user-content-cond-prototype-set-close-parameters
[def-is-close-params]: #user-content-def-prototype-is-close-parameters
[def-set-close-params]: #user-content-def-prototype-set-close-parameters
[blk-is-close-returns]: #user-content-blk-prototype-is-close-returns
[blk-set-close-returns]: #user-content-blk-prototype-set-close-returns
[cond-is-close-returns]: #user-content-cond-prototype-is-close-returns
[cond-set-close-returns]: #user-content-cond-prototype-set-close-returns
[def-is-close-returns]: #user-content-def-prototype-is-close-returns
[def-set-close-returns]: #user-content-def-prototype-set-close-returns

<a name="root-cmd-scope"></a>
## Root Command Scope
When the term *root scope* is used in respect to a *command* (i.e. not a [Dir][dir] or [File][file] root scope), it refers to each [grouping][grps] *command* at the [File][file] root scope (i.e. not defined within another *command's* scope).
<br><br>

<a name="groups"></a>
## Group Commands
[Group][grps] *commands* are how you define scopes of code that can be referenced from other [file][file] or [command][root-cmd] root scopes (i.e. let's avoid infinite include or insert loops -- meaning you cannot reference [groups][grps] within the same [root scope][root-cmd]) and that can be flexibly enabled or disabled. Every [group][grps] *command* type has an [open][open-cmd] and [close][close-cmd] *command*.

- [Open Commands][open-cmd]
- [Close Commands][close-cmd]
- [Block Command & Class][blk]
  - [Blk Action Syntax][blk-act]
  - [Blk Constructor][blk-new]
  - [Blk Instance Properties][blk-props]
  - [Blk.prototype.isClose][blk-is-close]
  - [Blk.prototype.setClose][blk-set-close]
- [Conditional Command & Class][cond]
  - [Cond Action Syntax][cond-act]
  - [Cond Constructor][cond-new]
  - [Cond Instance Properties][cond-props]
  - [Cond.prototype.isClose][cond-is-close]
  - [Cond.prototype.setClose][cond-set-close]
- [Define Command & Class][def]
  - [Def Action Syntax][def-act]
  - [Def Constructor][def-new]
  - [Def Instance Properties][def-props]
  - [Def.prototype.isClose][def-is-close]
  - [Def.prototype.setClose][def-set-close]
<br>

<a name="open-cmd"></a>
## Open Commands
The [open][open-cmd] *command* starts a new group. All three [group][grps] *command* types use three curly open brackets, `"{{{"`, within the *action* to denote an [open][open-cmd] *command* (e.g. `"/// #{{{ @tag id"`).
<br><br>

<a name="close-cmd"></a>
## Close Commands
The [close][close-cmd] *command* ends an existing group. All three [group][grps] *command* types require [groups][grps] to close the most recent [group][grps] first and that the [tag][blk-tag] and [ID][blk-id] of the [close][close-cmd] *command* exactly match that of the [open][open-cmd] *command*. All three [group][grps] *command* types also use three curly close brackets, `"}}}"`, within the *action* to denote a [close][close-cmd] *command* (e.g. `"/// #}}} @tag id"`).
<br><br>

<a name="blk"></a>
## Block Command & Class
The [block][blk] *command* is a general [grouping][grps] *command* that may be [included][incl] from other [file][file] scopes. The [block class][blk], `Blk`, wraps each [block][blk] *command*.

- [Blk Action Syntax][blk-act]
- [Blk Constructor][blk-new]
- [Blk Instance Properties][blk-props]
- [Blk.prototype.isClose][blk-is-close]
  - [Parameters][blk-is-close-params]
  - [Returns][blk-is-close-returns]
- [Blk.prototype.setClose][blk-set-close]
  - [Parameters][blk-set-close-params]
  - [Returns][blk-set-close-returns]
<br>

<a name="blk-actions"></a>
## Blk Action Syntax

| Open Action | Close Action |
|:------------|:-------------|
| `"#{{{"`    | `"#}}}"`     |
<br>

<a name="blk-constructor"></a>
## Blk Constructor
This method creates `Blk` instances. Use the `new` keyword when calling `Blk` (e.g. `blk = new Blk(line, file, cmd);`).

|    | Parameter                                   | Data Type          | Description
|:---|:--------------------------------------------|:-------------------|:------------
| 1  | <a name="blk-constructor-open"></a>open     | *`!Line`*          | The opening [Line][line] instance.
| 2  | <a name="blk-constructor-file"></a>file     | *`!File`*          | The parent [File][file] instance.
| 3  | <a name="blk-constructor-parent"></a>parent | *`(?Blk\|?Cond)=`* | The parent [Blk][blk] or [Cond][cond] instance.
<br>

[blk-new-open]: #user-content-blk-constructor-open
[blk-new-file]: #user-content-blk-constructor-file
[blk-new-parent]: #user-content-blk-constructor-parent

<a name="blk-members"></a>
## Blk Instance Properties

| Property Name                            | Data Type                               | Description
|:-----------------------------------------|:----------------------------------------|:------------
| <a name="blk-member-type"></a>type       | *`!Object`*                             | A pointer to a unique `object` instance designated for the [Blk][blk] class.
| <a name="blk-member-tag"></a>tag         | *`string`*                              | The [Blk][blk] instance's [tag][blk-tag] name (e.g. `"/// #{{{ @tag id"`).
| <a name="blk-member-id"></a>id           | *`string`*                              | The [Blk][blk] instance's [ID][blk-id] name (e.g. `"/// #}}} @tag id"`).
| <a name="blk-member-file"></a>file       | *`!File`*                               | A pointer to the parent [File][file] instance.
| <a name="blk-member-open"></a>open       | *`!Line`*                               | A pointer to opening [Line][line] instance.
| <a name="blk-member-close"></a>close     | *`!Line`*                               | A pointer to closing [Line][line] instance.
| <a name="blk-member-parent"></a>parent   | *`(?Blk\|?Cond)`*                       | A pointer to the parent [Blk][blk] or [Cond][cond] instance. It is `null` if it is at the root scope of the [File][file] instance (i.e. it becomes a [root scope][root-scope] *command*).
| <a name="blk-member-blks"></a>blks       | *`!Object<!Blk>`*                       | A hash map of all of the [Blk][blk] instances within the immediate scope of the [Blk][blk] instance. The *hashed* `object` key names combine each [Blk][blk] instance's [tag][blk-tag] and [ID][blk-id] with a colon separator (e.g. `"tag:id"`).
| <a name="blk-member-conds"></a>conds     | *`!Object<!Cond>`*                      | A hash map of all of the [Cond][cond] instances within the immediate scope of the [Blk][blk] instance. The *hashed* `object` key names combine each [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id] with a colon separator (e.g. `"tag:id"`).
| <a name="blk-member-incls"></a>incls     | *`!Object<!Incl>`*                      | A hash map of all of the [Incl][incl] instances within the immediate scope of the [Blk][blk] instance. The *hashed* `object` key names combine each [Incl][incl] instance's [tag][incl-tag] and [ID][incl-id] with a colon separator (e.g. `"tag:id"`).
| <a name="blk-member-content"></a>content | *`!Array<(!Line\|!Blk\|!Cond\|!Incl)>`* | An ordered `array` of all of the [Line][line], [Blk][blk], [Cond][cond], and [Incl][incl] instances within the immediate scope of the [Blk][blk] instance.
<br>

[blk-type]: #user-content-blk-member-type
[blk-tag]: #user-content-blk-member-tag
[blk-id]: #user-content-blk-member-id
[blk-file]: #user-content-blk-member-file
[blk-open]: #user-content-blk-member-open
[blk-close]: #user-content-blk-member-close
[blk-parent]: #user-content-blk-member-parent
[blk-blks]: #user-content-blk-member-blks
[blk-conds]: #user-content-blk-member-conds
[blk-incls]: #user-content-blk-member-incls
[blk-content]: #user-content-blk-member-content

<a name="blk-prototype-is-close"></a>
## Blk.prototype.isClose
This method tests if a line of text is a valid closing [block][blk] *command* and if it matches the [block][blk] instance's [tag][blk-tag] and [ID][blk-id].

<a name="blk-prototype-is-close-parameters"></a>
### Parameters

|    | Parameter                                      | Data Type  | Description
|:---|:-----------------------------------------------|:-----------|:------------
| 1  | <a name="blk-prototype-is-close-text"></a>text | *`string`* | The text of a [Line][line] instance to check.

[blk-is-close-text]: #user-content-blk-prototype-is-close-text

<a name="blk-prototype-is-close-returns"></a>
### Returns

| Data Type   | Description
|:------------|:------------
| *`boolean`* | [Blk.prototype.isClose][blk-is-close] returns the result of the [close][close-cmd] *command* test.
<br>

<a name="blk-prototype-set-close"></a>
## Blk.prototype.setClose
This method sets the [close][blk-close] property for the [Blk][blk] instance.

<a name="blk-prototype-set-close-parameters"></a>
### Parameters

|    | Parameter                                         | Data Type | Description
|:---|:--------------------------------------------------|:----------|:------------
| 1  | <a name="blk-prototype-set-close-close"></a>close | *`!Line`* | The closing [Line][line] instance.

[blk-set-close-close]: #user-content-blk-prototype-set-close-close

<a name="blk-prototype-set-close-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [Blk.prototype.setClose][blk-set-close] does not return a value.
<br>


<a name="cond"></a>
## Conditional Command & Class
The [conditional][cond] *command* is a special [grouping][grps] *command* that shows or hides its [content][cond-content] based upon the [state][file-run-state] `object` passed to [File.prototype.run][file-run] (i.e. it can be easily enabled or disabled at will). Currently, it may NOT be [referenced][refs] from within other [file][file] or [command][root-cmd] root scopes. The [conditional class][cond], `Cond`, wraps each [conditional][cond] *command*.

- [Cond Action Syntax][cond-act]
- [Cond Constructor][cond-new]
- [Cond Instance Properties][cond-props]
- [Cond.prototype.isClose][cond-is-close]
  - [Parameters][cond-is-close-params]
  - [Returns][cond-is-close-returns]
- [Cond.prototype.setClose][cond-set-close]
  - [Parameters][cond-set-close-params]
  - [Returns][cond-set-close-returns]
<br>

<a name="cond-actions"></a>
## Cond Action Syntax

| Open Action   | Close Action  |
|:--------------|:--------------|
| `"#if{{{"`    | `"#if}}}"`    |
| `"#ifnot{{{"` | `"#ifnot}}}"` |
<br>

<a name="cond-constructor"></a>
## Cond Constructor
This method creates `Cond` instances. Use the `new` keyword when calling `Cond` (e.g. `cond = new Cond(line, file, cmd);`).

|    | Parameter                                    | Data Type          | Description
|:---|:---------------------------------------------|:-------------------|:------------
| 1  | <a name="cond-constructor-open"></a>open     | *`!Line`*          | The opening [Line][line] instance.
| 2  | <a name="cond-constructor-file"></a>file     | *`!File`*          | The parent [File][file] instance.
| 3  | <a name="cond-constructor-parent"></a>parent | *`(?Blk\|?Cond)=`* | The parent [Blk][blk] or [Cond][cond] instance.
<br>

[cond-new-open]: #user-content-cond-constructor-open
[cond-new-file]: #user-content-cond-constructor-file
[cond-new-parent]: #user-content-cond-constructor-parent

<a name="cond-members"></a>
## Cond Instance Properties

| Property Name                             | Data Type                               | Description
|:------------------------------------------|:----------------------------------------|:------------
| <a name="cond-member-type"></a>type       | *`!Object`*                             | A pointer to a unique `object` instance designated for the [Cond][cond] class.
| <a name="cond-member-tag"></a>tag         | *`string`*                              | The [Cond][cond] instance's [tag][cond-tag] name (e.g. `"/// #if{{{ @tag id"`).
| <a name="cond-member-id"></a>id           | *`string`*                              | The [Cond][cond] instance's [ID][cond-id] name (e.g. `"/// #ifnot}}} @tag id"`).
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

[cond-type]: #user-content-cond-member-type
[cond-tag]: #user-content-cond-member-tag
[cond-id]: #user-content-cond-member-id
[cond-action]: #user-content-cond-member-action
[cond-file]: #user-content-cond-member-file
[cond-open]: #user-content-cond-member-open
[cond-close]: #user-content-cond-member-close
[cond-parent]: #user-content-cond-member-parent
[cond-blks]: #user-content-cond-member-blks
[cond-conds]: #user-content-cond-member-conds
[cond-incls]: #user-content-cond-member-incls
[cond-content]: #user-content-cond-member-content

<a name="cond-prototype-is-close"></a>
## Cond.prototype.isClose
This method tests if a line of text is a valid closing [conditional][cond] *command* and if it matches the [conditional][cond] instance's [tag][cond-tag] and [ID][cond-id].

<a name="cond-prototype-is-close-parameters"></a>
### Parameters

|    | Parameter                                       | Data Type  | Description
|:---|:------------------------------------------------|:-----------|:------------
| 1  | <a name="cond-prototype-is-close-text"></a>text | *`string`* | The text of a [Line][line] instance to check.

[cond-is-close-text]: #user-content-cond-prototype-is-close-text

<a name="cond-prototype-is-close-returns"></a>
### Returns

| Data Type   | Description
|:------------|:------------
| *`boolean`* | [Cond.prototype.isClose][cond-is-close] returns the result of the [close][close-cmd] *command* test.
<br>

<a name="cond-prototype-set-close"></a>
## Cond.prototype.setClose
This method sets the [close][cond-close] property for the [Cond][cond] instance.

<a name="cond-prototype-set-close-parameters"></a>
### Parameters

|    | Parameter                                          | Data Type | Description
|:---|:---------------------------------------------------|:----------|:------------
| 1  | <a name="cond-prototype-set-close-close"></a>close | *`!Line`* | The closing [Line][line] instance.

[cond-set-close-close]: #user-content-cond-prototype-set-close-close

<a name="cond-prototype-set-close-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [Cond.prototype.setClose][cond-set-close] does not return a value.
<br>


<a name="def"></a>
## Define Command & Class
The [define][def] *command* is a special [grouping][grps] *command* for defining simple C-like macros. [Define][def] *commands* must be defined in the root scope of a [File][file] before all other *command* types. [Define][def] *commands* may be [inserted][ins] from all other [File][file], [Block][blk], or [Conditional][cond] scopes. The [define class][def], `Def`, wraps each [define][def] *command*.

- [Def Action Syntax][def-act]
- [Def Constructor][def-new]
- [Def Instance Properties][def-props]
- [Def.prototype.isClose][def-is-close]
  - [Parameters][def-is-close-params]
  - [Returns][def-is-close-returns]
- [Def.prototype.setClose][def-set-close]
  - [Parameters][def-set-close-params]
  - [Returns][def-set-close-returns]
<br>

<a name="def-actions"></a>
## Def Action Syntax

| Open Action | Close Action |
|:------------|:-------------|
| `"#def{{{"` | `"#def}}}"`  |
<br>

<a name="def-constructor"></a>
## Def Constructor
This method creates `Def` instances. Use the `new` keyword when calling `Def` (e.g. `def = new Def(line, file);`).

|    | Parameter                               | Data Type | Description
|:---|:----------------------------------------|:----------|:------------
| 1  | <a name="def-constructor-open"></a>open | *`!Line`* | The opening [Line][line] instance.
| 2  | <a name="def-constructor-file"></a>file | *`!File`* | The parent [File][file] instance.
<br>

[def-new-open]: #user-content-def-constructor-open
[def-new-file]: #user-content-def-constructor-file

<a name="def-members"></a>
## Def Instance Properties

| Property Name                        | Data Type         | Description
|:-------------------------------------|:------------------|:------------
| <a name="def-member-type"></a>type   | *`!Object`*       | A pointer to a unique `object` instance designated for the [Def][def] class.
| <a name="def-member-tag"></a>tag     | *`string`*        | The [Def][def] instance's [tag][def-tag] name (e.g. `"/// #{{{ @tag id"`).
| <a name="def-member-id"></a>id       | *`string`*        | The [Def][def] instance's [ID][def-id] name (e.g. `"/// #}}} @tag id"`).
| <a name="def-member-file"></a>file   | *`!File`*         | A pointer to the parent [File][file] instance.
| <a name="def-member-open"></a>open   | *`!Line`*         | A pointer to opening [Line][line] instance.
| <a name="def-member-close"></a>close | *`!Line`*         | A pointer to closing [Line][line] instance.
| <a name="def-member-lines"></a>lines | *`!Array<!Line>`* | An ordered `array` of all of the [Line][line] instances within the [Def][def] instance scope.
<br>

[def-type]: #user-content-def-member-type
[def-tag]: #user-content-def-member-tag
[def-id]: #user-content-def-member-id
[def-file]: #user-content-def-member-file
[def-open]: #user-content-def-member-open
[def-close]: #user-content-def-member-close
[def-lines]: #user-content-def-member-lines

<a name="def-prototype-is-close"></a>
## Def.prototype.isClose
This method tests if a line of text is a valid closing [define][def] *command* and if it matches the [define][def] instance's [tag][def-tag] and [ID][def-id].

<a name="def-prototype-is-close-parameters"></a>
### Parameters

|    | Parameter                                      | Data Type  | Description
|:---|:-----------------------------------------------|:-----------|:------------
| 1  | <a name="def-prototype-is-close-text"></a>text | *`string`* | The text of a [Line][line] instance to check.

[def-is-close-text]: #user-content-def-prototype-is-close-text

<a name="def-prototype-is-close-returns"></a>
### Returns

| Data Type   | Description
|:------------|:------------
| *`boolean`* | [Def.prototype.isClose][def-is-close] returns the result of the [close][close-cmd] *command* test.
<br>

<a name="def-prototype-set-close"></a>
## Def.prototype.setClose
This method sets the [close][def-close] property for the [Def][def] instance.

<a name="def-prototype-set-close-parameters"></a>
### Parameters

|    | Parameter                                         | Data Type | Description
|:---|:--------------------------------------------------|:----------|:------------
| 1  | <a name="def-prototype-set-close-close"></a>close | *`!Line`* | The closing [Line][line] instance.

[def-set-close-close]: #user-content-def-prototype-set-close-close

<a name="def-prototype-set-close-returns"></a>
### Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | [Def.prototype.setClose][def-set-close] does not return a value.
<br>


<a name="refs"></a>
## Reference Commands
[Reference][refs] *commands* allow you to use code from other [file][file] or [command][root-cmd] scopes.

- [Include Command & Class][incl]
  - [Incl Action Syntax][incl-act]
  - [Incl Constructor][incl-new]
  - [Incl Instance Properties][incl-props]
  - [Incl.prototype.][incl-]
- [Insert Command & Class][ins]
  - [Ins Action Syntax][ins-act]
  - [Ins Constructor][ins-new]
  - [Ins Instance Properties][ins-props]
<br>

<a name="incl"></a>
## Include Command & Class
The [include][incl] *command* is a general [reference][refs] *command* that allows you to include the [content][blk-content] of a [root command][root-cmd] from another [file][file] into the [content][file-content] of your current [file][file]. The [include class][incl], `Incl`, wraps each [include][incl] *command*.

- [Incl Action Syntax][incl-act]
- [Incl Constructor][incl-new]
- [Incl Instance Properties][incl-props]
- [Incl.prototype.][incl-]
  - [Parameters][incl--params]
  - [Returns][incl--returns]
<br>

<a name="incl-actions"></a>
## Incl Action Syntax

| Action       |
|:-------------|
| `"#include"` |
<br>

<a name="incl-constructor"></a>
## Incl Constructor
This method creates `Incl` instances. Use the `new` keyword when calling `Incl` (e.g. `incl = new Incl(line, file, cmd);`).

|    | Parameter                                    | Data Type          | Description
|:---|:---------------------------------------------|:-------------------|:------------
| 1  | <a name="incl-constructor-line"></a>line     | *`!Line`*          | The defining [Line][line] instance.
| 2  | <a name="incl-constructor-file"></a>file     | *`!File`*          | The parent [File][file] instance.
| 3  | <a name="incl-constructor-parent"></a>parent | *`(?Blk\|?Cond)=`* | The parent [Blk][blk] or [Cond][cond] instance.
<br>

[incl-new-line]: #user-content-incl-constructor-line
[incl-new-file]: #user-content-incl-constructor-file
[incl-new-parent]: #user-content-incl-constructor-parent

<a name="incl-members"></a>
## Incl Instance Properties

| Property Name                           | Data Type         | Description
|:----------------------------------------|:------------------|:------------
| <a name="incl-member-type"></a>type     | *`!Object`*       | A pointer to a unique `object` instance designated for the [Incl][incl] class.
| <a name="incl-member-tag"></a>tag       | *`string`*        | The [Incl][incl] instance's [tag][incl-tag] name (e.g. `"/// #include @tag id"`).
| <a name="incl-member-id"></a>id         | *`string`*        | The [Incl][incl] instance's [ID][incl-id] name (e.g. `"/// #include @tag id"`).
| <a name="incl-member-path"></a>path     | *`string`*        | The [Incl][incl] instance's [path][incl-path] value (e.g. `"/// #include @tag id ./path/to/file.js"`).
| <a name="incl-member-file"></a>file     | *`!File`*         | A pointer to the parent [File][file] instance.
| <a name="incl-member-line"></a>line     | *`!Line`*         | A pointer to defining [Line][line] instance.
| <a name="incl-member-parent"></a>parent | *`(?Blk\|?Cond)`* | A pointer to the parent [Blk][blk] or [Cond][cond] instance. It is `null` if it is at the root scope of the [File][file] instance (i.e. it becomes like a [root][root-cmd] [group][grps] *command*).
| <a name="incl-member-cmd"></a>cmd       | *`!Blk`*          | A pointer to the included [Blk][blk] instance.
<br>

[incl-type]: #user-content-incl-member-type
[incl-tag]: #user-content-incl-member-tag
[incl-id]: #user-content-incl-member-id
[incl-path]: #user-content-incl-member-path
[incl-file]: #user-content-incl-member-file
[incl-line]: #user-content-incl-member-line
[incl-parent]: #user-content-incl-member-parent
[incl-cmd]: #user-content-incl-member-cmd


<a name="ins"></a>
## Insert Command & Class
The [insert][ins] *command* is a special [reference][refs] *command* that allows you to insert the [lines][def-lines] of any [define][def] *command* into the [lines][file-lines] of your current [file][file] during the [preparse][file-preparse] stage (i.e. before any [block][blk], [conditional][cond], or [include][incl] *commands* are parsed). If you would like to [insert][ins] a [define][def] from the same [file][file], you do not need to add a [path component][cmd-rule7] to the [insert][ins] *command*. The [insert class][ins], `Ins`, wraps each [insert][ins] *command*.

- [Ins Action Syntax][ins-act]
- [Ins Constructor][ins-new]
- [Ins Instance Properties][ins-props]
<br>

<a name="ins-actions"></a>
## Ins Action Syntax

| Action      |
|:------------|
| `"#insert"` |
<br>

<a name="ins-constructor"></a>
## Ins Constructor
This method creates `Ins` instances. Use the `new` keyword when calling `Ins` (e.g. `ins = new Ins(line, 1, file);`).

|    | Parameter                                 | Data Type  | Description
|:---|:------------------------------------------|:-----------|:------------
| 1  | <a name="ins-constructor-line"></a>line   | *`!Line`*  | The defining [Line][line] instance.
| 2  | <a name="ins-constructor-index"></a>index | *`number`* | The defining [index][ins-index] within the parent [File][file] instance's [lines][file-lines] `array`.
| 3  | <a name="ins-constructor-file"></a>file   | *`!File`*  | The parent [File][file] instance.
<br>

[ins-new-line]: #user-content-ins-constructor-line
[ins-new-index]: #user-content-ins-constructor-index
[ins-new-file]: #user-content-ins-constructor-file

<a name="ins-members"></a>
## Ins Instance Properties

| Property Name                        | Data Type         | Description
|:-------------------------------------|:------------------|:------------
| <a name="ins-member-type"></a>type   | *`!Object`*       | A pointer to a unique `object` instance designated for the [Ins][ins] class.
| <a name="ins-member-tag"></a>tag     | *`string`*        | The [Ins][ins] instance's [tag][ins-tag] name (e.g. `"/// #insert @tag id"`).
| <a name="ins-member-id"></a>id       | *`string`*        | The [Ins][ins] instance's [ID][ins-id] name (e.g. `"/// #insert @tag id"`).
| <a name="ins-member-path"></a>path   | *`string`*        | The [Ins][ins] instance's [path][ins-path] value (e.g. `"/// #insert @tag id ./path/to/file.js"`).
| <a name="ins-member-file"></a>file   | *`!File`*         | A pointer to the parent [File][file] instance.
| <a name="ins-member-line"></a>line   | *`!Line`*         | A pointer to defining [Line][line] instance.
| <a name="ins-member-def"></a>def     | *`!Def`*          | A pointer to the included [Def][def] instance.
| <a name="ins-member-index"></a>index | *`number`*        | The index of the defining [Line][line] instance's place in the [File][file] instance's [lines][file-lines] `array`.
<br>

[ins-type]: #user-content-ins-member-type
[ins-tag]: #user-content-ins-member-tag
[ins-id]: #user-content-ins-member-id
[ins-path]: #user-content-ins-member-path
[ins-file]: #user-content-ins-member-file
[ins-line]: #user-content-ins-member-line
[ins-def]: #user-content-ins-member-def
[ins-index]: #user-content-ins-member-index

