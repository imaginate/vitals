# Compile Class & Syntax Specs
This guide describes every compile class, defines each member and method of every class, and provides descriptive details for the compile syntax within the source. It is likely that this compiler will become its own separate project in the future. Thoughts and feedback appreciated.
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
Each file-system class wraps a different file-system component for the compiler.

- [Directory Class][dir]
  - [Constructor][dir-construct]
  - [Members][dir-members]
  - [Methods][dir-methods]
- [File Class][file]
  - [Constructor][file-construct]
  - [Members][file-members]
  - [Methods][file-methods]
- [Line Class][line]
  - [Constructor][line-construct]
  - [Members][line-members]
  - [Methods][line-methods]
<br>

[fs]: #user-content-fs
[dir]: #user-content-dir
[file]: #user-content-file
[line]: #user-content-line
[dir-construct]: #user-content-dir-construct
[file-construct]: #user-content-file-construct
[line-construct]: #user-content-line-construct
[dir-members]: #user-content-dir-members
[file-members]: #user-content-file-members
[line-members]: #user-content-line-members
[dir-methods]: #user-content-dir-methods
[file-methods]: #user-content-file-methods
[line-methods]: #user-content-line-methods

<a name="dir"></a>
## Directory Class
The [directory class][dir] wraps each directory node within the *src* tree.

- [Directory Constructor][dir-construct]
- [Directory Members][dir-members]
- [Directory Methods][dir-methods]
  - [Dir.prototype.load][dir-load]
  - [Dir.prototype.preprocess][dir-preprocess]
  - [Dir.prototype.process][dir-process]
  - [Dir.prototype.compile][dir-compile]
<br>

[dir-load]: #user-content-dir-method-load
[dir-preprocess]: #user-content-dir-method-preprocess
[dir-process]: #user-content-dir-method-process
[dir-compile]: #user-content-dir-method-compile
[dir-load-params]: #user-content-dir-method-load-params
[dir-preprocess-params]: #user-content-dir-method-preprocess-params
[dir-process-params]: #user-content-dir-method-process-params
[dir-compile-params]: #user-content-dir-method-compile-params
[dir-load-returns]: #user-content-dir-method-load-returns
[dir-preprocess-returns]: #user-content-dir-method-preprocess-returns
[dir-process-returns]: #user-content-dir-method-process-returns
[dir-compile-returns]: #user-content-dir-method-compile-returns

<a name="dir-construct"></a>
### Directory Constructor

| Constructor |
|:------------|
| `Dir`       |

|    | Parameter                                 | Data Type  | Description
|:---|:------------------------------------------|:-----------|:------------
| 1  | <a name="dir-construct-path"></a>path     | *`string`* | The file path to the directory node being wrapped. The directory path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory).
| 2  | <a name="dir-construct-parent"></a>parent | *`?Dir=`*  | The parent [Dir][dir] instance. This parameter is required for all [Dir][dir] instances except for the root [Dir][dir] instance (i.e. since the root instance is the only exposed instance, this parameter is not a part of the public API).
<br>

[dir-construct-path]: #user-content-dir-construct-path
[dir-construct-parent]: #user-content-dir-construct-parent

<a name="dir-members"></a>
### Directory Members

| Member                                 | Data Type                  | Description
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

<a name="dir-methods"></a>
### Directory Methods

- [Dir.prototype.load][dir-load]
  - [Parameters][dir-load-params]
  - [Returns][dir-load-returns]
- [Dir.prototype.preprocess][dir-preprocess]
  - [Parameters][dir-preprocess-params]
  - [Returns][dir-preprocess-returns]
- [Dir.prototype.process][dir-process]
  - [Parameters][dir-process-params]
  - [Returns][dir-process-returns]
- [Dir.prototype.compile][dir-compile]
  - [Parameters][dir-compile-params]
  - [Returns][dir-compile-returns]

<a name="dir-method-load"></a>
### Dir.prototype.load
This method triggers [Dir.prototype.load][dir-load] for each [Dir][dir] instance within the [dirs][dir-dirs] `array` and [File.prototype.load][file-load] for each [File][file] instance within the [files][dir-files] `array`.

<a name="dir-method-load-params"></a>
#### Dir.prototype.load Parameters
This method has no parameters.

<a name="dir-method-load-returns"></a>
#### Dir.prototype.load Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | This method does not return a value.

<a name="dir-method-preprocess"></a>
### Dir.prototype.preprocess
This method triggers [Dir.prototype.preprocess][dir-preprocess] for each [Dir][dir] instance within the [dirs][dir-dirs] `array` and [File.prototype.preprocess][file-preprocess] for each [File][file] instance within the [files][dir-files] `array`.

<a name="dir-method-preprocess-params"></a>
#### Dir.prototype.preprocess Parameters
This method has no parameters.

<a name="dir-method-preprocess-returns"></a>
#### Dir.prototype.preprocess Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | This method does not return a value.

<a name="dir-method-process"></a>
### Dir.prototype.process
This method triggers [Dir.prototype.process][dir-process] for each [Dir][dir] instance within the [dirs][dir-dirs] `array` and [File.prototype.process][file-process] for each [File][file] instance within the [files][dir-files] `array`.

<a name="dir-method-process-params"></a>
#### Dir.prototype.process Parameters
This method has no parameters.

<a name="dir-method-process-returns"></a>
#### Dir.prototype.process Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | This method does not return a value.

<a name="dir-method-compile"></a>
### Dir.prototype.compile
This method triggers [File.prototype.compile][file-compile] for the [File][file] instance that matches the file path defined by the [src][dir-compile-src] parameter.

<a name="dir-method-compile-params"></a>
#### Dir.prototype.compile Parameters

|    | Parameter                                    | Data Type                        | Description
|:---|:---------------------------------------------|:---------------------------------|:------------
| 1  | <a name="dir-method-compile-src"></a>src     | *`string`*                       | The file path to the source [File][file] instance you want to call [File.prototype.compile][file-compile] from. The file path must be RELATIVE TO THE ROOT [Dir][dir] instance (as only the root [Dir][dir] instance API is exposed to users). NO ABSOLUTE PATHS are allowed for this parameter.
| 2  | <a name="dir-method-compile-dest"></a>dest   | *`string`*                       | The file path to the destination you want to save the compiled result of [File.prototype.compile][file-compile]. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory). The directory path up to the file name of the resolved [dest][dir-compile-dest] path must already exist. If a file exists at the resolved [dest][dir-compile-dest] path, it is overwritten.
| 3  | <a name="dir-method-compile-state"></a>state | *`!Object<string, boolean>`*     | The enabled, `true`, or disabled, `false`, state for every [conditional command][cond] defined within the [src][dir-compile-src] [File][file] instance's [content][file-content] `array`. Each [state][dir-compile-state] `object` key must be *hashed* (i.e. created) by combining each [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id] with a colon, `":"`, separating them (e.g. `"tag:id"`). EVERY CONDITIONAL MUST BE DEFINED within the [state][dir-compile-state] or an error will be thrown.
| 4  | <a name="dir-method-compile-alter"></a>alter | *`(!function(string): string)=`* | The [alter][dir-compile-alter] `function` is optional. If it is defined, it allows you to provide custom alterations to the compiled result of [File.prototype.compile][file-compile] before it is saved to the [dest][dir-compile-dest].

[dir-compile-src]: #user-content-dir-method-compile-src
[dir-compile-dest]: #user-content-dir-method-compile-dest
[dir-compile-state]: #user-content-dir-method-compile-state
[dir-compile-alter]: #user-content-dir-method-compile-alter

<a name="dir-method-compile-returns"></a>
#### Dir.prototype.compile Returns

| Data Type   | Description
|:------------|:------------
| *`string`*  | The compiled result (UTF-8 encoded) that was saved to the [dest][dir-compile-dest].
<br>


<a name="file"></a>
## File Class
The [file class][file] wraps each file node within the *src* tree.

- [File Constructor][file-construct]
- [File Members][file-members]
- [File Methods][file-methods]
  - [File.prototype.load][file-load]
  - [File.prototype.preprocess][file-preprocess]
  - [File.prototype.process][file-process]
  - [File.prototype.compile][file-compile]
<br>

[file-load]: #user-content-file-method-load
[file-preprocess]: #user-content-file-method-preprocess
[file-process]: #user-content-file-method-process
[file-compile]: #user-content-file-method-compile
[file-load-params]: #user-content-file-method-load-params
[file-preprocess-params]: #user-content-file-method-preprocess-params
[file-process-params]: #user-content-file-method-process-params
[file-compile-params]: #user-content-file-method-compile-params
[file-load-returns]: #user-content-file-method-load-returns
[file-preprocess-returns]: #user-content-file-method-preprocess-returns
[file-process-returns]: #user-content-file-method-process-returns
[file-compile-returns]: #user-content-file-method-compile-returns

<a name="file-construct"></a>
### File Constructor

| Constructor |
|:------------|
| `File`      |

|    | Parameter                                  | Data Type  | Description
|:---|:-------------------------------------------|:-----------|:------------
| 1  | <a name="file-construct-path"></a>path     | *`string`* | The file path to the file node being wrapped. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory).
| 2  | <a name="file-construct-parent"></a>parent | *`!Dir`*   | The parent [Dir][dir] instance.
<br>

[file-construct-path]: #user-content-file-construct-path
[file-construct-parent]: #user-content-file-construct-parent

<a name="file-members"></a>
### File Members

| Member                                    | Data Type                               | Description
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

<a name="file-methods"></a>
### File Methods

- [File.prototype.load][file-load]
  - [Parameters][file-load-params]
  - [Returns][file-load-returns]
- [File.prototype.preprocess][file-preprocess]
  - [Parameters][file-preprocess-params]
  - [Returns][file-preprocess-returns]
- [File.prototype.process][file-process]
  - [Parameters][file-process-params]
  - [Returns][file-process-returns]
- [File.prototype.compile][file-compile]
  - [Parameters][file-compile-params]
  - [Returns][file-compile-returns]

<a name="file-method-load"></a>
### File.prototype.load
This method causes the [File][file] instance's [path][file-path] to be read, a new [Line][line] instance to be constructed and pushed to the [File][file] instance's [lines][file-lines] `array` for each line within the [File][file], a new [Def][def] instance to be constructed and defined in the [File][file] instance's [defs][file-defs] `object` for each [Def][def] within the [File][file], and each [Line][line] within the [lines][def-lines] `array` of each [Def][def] instance to be spliced from the [File][file] instance's [lines][file-lines] `array`.

<a name="file-method-load-params"></a>
#### File.prototype.load Parameters
This method has no parameters.

<a name="file-method-load-returns"></a>
#### File.prototype.load Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | This method does not return a value.

<a name="file-method-preprocess"></a>
### File.prototype.preprocess
This method causes a new [Ins][ins] instance to be constructed and pushed to the [File][file] instance's [inserts][file-inserts] `array` for each [Ins][ins] within the [File][file], each [Ins][ins] instance's [line][ins-line] property's [Line][line] instance to spliced from the [File][file] instance's [lines][file-lines] `array`, and each [Line][line] instance from each [Ins][ins] instance's [lines][ins-lines] `array` to be spliced to the [File][file] instance's [lines][file-lines] `array`.

<a name="file-method-preprocess-params"></a>
#### File.prototype.preprocess Parameters
This method has no parameters.

<a name="file-method-preprocess-returns"></a>
#### File.prototype.preprocess Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | This method does not return a value.

<a name="file-method-process"></a>
### File.prototype.process
This method causes a new [Blk][blk], [Cond][cond], or [Incl][incl] instance to be constructed and defined in the [File][file] instance's [blks][file-blks], [conds][file-conds], or [incls][file-incls] `object` for each [Blk][blk], [Cond][cond], and [Incl][incl] within the root scope of the [File][file] instance and the [File][file] instance's [content][file-content] `array` to be filled (in order of appearance) with each [Line][line], [Blk][blk], [Cond][cond], and [Incl][incl] within the root scope of the [File][file] instance.

<a name="file-method-process-params"></a>
#### File.prototype.process Parameters
This method has no parameters.

<a name="file-method-process-returns"></a>
#### File.prototype.process Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | This method does not return a value.

<a name="file-method-compile"></a>
### File.prototype.compile
This method creates a compiled destination file, [dest][file-compile-dest].

<a name="file-method-compile-params"></a>
#### File.prototype.compile Parameters

|    | Parameter                                     | Data Type                        | Description
|:---|:----------------------------------------------|:---------------------------------|:------------
| 1  | <a name="file-method-compile-dest"></a>dest   | *`string`*                       | The file path to the destination you want to save the compiled result. The file path may be relative or absolute. If it is a relative path, it is RELATIVE TO THE CWD (current working directory). The directory path up to the file name of the resolved [dest][file-compile-dest] path must already exist. If a file exists at the resolved [dest][file-compile-dest] path, it is overwritten.
| 2  | <a name="file-method-compile-state"></a>state | *`!Object<string, boolean>`*     | The enabled, `true`, or disabled, `false`, state for every [conditional command][cond] defined within the [File][file] instance's [content][file-content] `array`. Each [state][file-compile-state] `object` key must be *hashed* (i.e. created) by combining each [Cond][cond] instance's [tag][cond-tag] and [ID][cond-id] with a colon, `":"`, separating them (e.g. `"tag:id"`). EVERY CONDITIONAL MUST BE DEFINED within the [state][file-compile-state] or an error will be thrown.
| 3  | <a name="file-method-compile-alter"></a>alter | *`(!function(string): string)=`* | The [alter][file-compile-alter] `function` is optional. If it is defined, it allows you to provide custom alterations to the compiled result before it is saved to the [dest][file-compile-dest].

[file-compile-dest]: #user-content-file-method-compile-dest
[file-compile-state]: #user-content-file-method-compile-state
[file-compile-alter]: #user-content-file-method-compile-alter

<a name="file-method-compile-returns"></a>
#### File.prototype.compile Returns

| Data Type   | Description
|:------------|:------------
| *`string`*  | The compiled result (UTF-8 encoded) that was saved to the [dest][file-compile-dest].
<br>


<a name="line"></a>
## Line Class
The [line class][line] wraps each line of text within every [File][file] instance.

- [Line Constructor][line-construct]
- [Line Members][line-members]
- [Line Methods][line-methods]
<br>

<a name="line-construct"></a>
### Line Constructor

| Constructor |
|:------------|
| `Line`      |

|    | Parameter                                | Data Type  | Description
|:---|:-----------------------------------------|:-----------|:------------
| 1  | <a name="line-construct-text"></a>text   | *`string`* | The UTF-8 encoded text for the new [Line][line].
| 2  | <a name="line-construct-index"></a>index | *`number`* | The line `number` relative to its parent [File][file].
| 3  | <a name="line-construct-file"></a>file   | *`!File`*  | The parent [File][file] instance.
<br>

[line-construct-text]: #user-content-line-construct-text
[line-construct-index]: #user-content-line-construct-index
[line-construct-file]: #user-content-line-construct-file

<a name="line-members"></a>
### Line Members

| Member                                    | Data Type   | Description
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

<a name="line-methods"></a>
### Line Methods
The [Line][line] class has no methods.
<br>


<a name="syntax"></a>
## Source Syntax
The compile syntax has a simple layout and structure. It is built upon a single option, the *command*. A *command* is always one line. It is based upon one pattern with few variations to comprise the five total syntax *command* types available. The five *command* types are separated into two general types, [groups][grps] and [references][refs]. The [group commands][grps] create *scopes* of code (e.g. JavaScript) that can be enabled or disabled and be re-used. The [reference commands][refs] reference [groups][grps] of code from outside *scopes* (e.g. other [files][file]) to give you more flexible composability with any programming language (although for now, it is only JavaScript, but that is easy to change). All of the *commands* consist of four basic syntax components, and both of the [reference][refs] *command* types have a fifth.

### The 5 Commands
##### The Group Commands
1. <p><strong><a href="#user-content-blk">Blocks</a></strong></p>
2. <p><strong><a href="#user-content-cond">Conditionals</a></strong></p>
3. <p><strong><a href="#user-content-def">Defines</a></strong></p>
##### The Reference Commands
4. <p><strong><a href="#user-content-incl">Includes</a></strong></p>
5. <p><strong><a href="#user-content-ins">Inserts</a></strong></p>

### The 5 Command Components
1. <p><strong><a href="#user-content-rule2">Comment</a></strong></p>
2. <p><strong><a href="#user-content-rule3">Action</a></strong></p>
3. <p><strong><a href="#user-content-rule5">Tag</a></strong></p>
4. <p><strong><a href="#user-content-rule6">ID</a></strong></p>
5. <p><strong><a href="#user-content-rule7">Path</a></strong></p>

### The 7 Command Rules
1. <p><a name="rule1"></a><strong>No Sharing</strong></p><p>A compile <em>command</em> must NOT share a line with any other syntax (e.g. JavaScript or JSDoc).</p>
2. <p><a name="rule2"></a><strong>Start With 3</strong></p><p>A compile <em>command</em> must start with a <em>comment</em> component. A <em>comment</em> component consists of three forward slashes, <code>"///"</code>, followed by at least one space or tab character, <code>" "</code>. The <em>comment</em> component may only be preceded by space or tab characters.</p>
3. <p><a name="rule3"></a><strong>Hash It</strong></p><p>A compile <em>command</em> must use a hash tag, <code>"#"</code>, to start the <em>action</em> component. It must follow the <em>comment</em> component's space or tab character(s) (e.g. <code>"/// #"</code>).</p>
4. <p><a name="rule4"></a><strong>Action Time</strong></p><p>A compile <em>command</em> must act with an <em>action</em> component. The <em>command</em> type is defined by the <em>action</em>. The desired <em>action</em> syntax must be specified immediately after the hash tag followed by at least one space or tab character (e.g. <code>"/// #if{{{ "</code> or <code>"/// #include "</code>). See the <em>command</em> sections for each <em>command</em> type's <em>action</em> syntax.</p>
5. <p><a name="rule5"></a><strong>Tag It</strong></p><p>The compile <em>commmand</em> must be tagged with a <em>tag</em> component. A <em>tag</em> component follows the <em>action</em> and must start with an at symbol, <code>"@"</code>, followed by your choice of <em>tag</em> name (only alphanumerics, underscores, dots, and dashes allowed) and at least one space or tab character (e.g. <code>"/// #insert @tagname "</code> or <code>"/// #def}}} @tag-name "</code>).</p>
6. <p><a name="rule6"></a><strong>ID It</strong></p><p>The compile <em>commmand</em> must be a hipster with the <em>ID</em> component. The <em>ID</em> must be assigned after the <em>tag</em>. It may only contain alphanumerics, underscores, dots, dashes, and dollar signs (e.g. <code>"/// #{{{ @tagname uniqueID"</code>) and must be unique to all other <em>command IDs</em> with the SAME <em>tag</em> name and within the SAME <a href="#user-content-file">file</a> or <a href="#user-content-grps">group</a> <em>scope</em> (i.e. if you want to give two <em>commands</em> in the same <em>scope</em> the same <em>ID</em>, you must give them different <em>tag</em> names).</p>
7. <p><a name="rule7"></a><strong>Ref Directions</strong></p><p>The <a href="#user-content-refs">reference</a> <em>command</em> must give directions with a <em>path</em> component to use a <a href="#user-content-grps">group</a> within another <a href="#user-content-file">file</a>. The <em>path</em> component must follow the space or tab character(s) that follow the <em>ID</em> component and must be a relative file path (e.g. <code>"/// #include @tag ID ../path/to/file.js"</code>). Note that space and tab characters are not allowed within file paths.</p>


### GOTO
- [Group Commands][grps]
  - [Block Command][blk]
  - [Conditional Command][cond]
  - [Define Command][def]
- [Reference Commands][refs]
  - [Include Command][incl]
  - [Insert Command][ins]
<br>

[syntax]: #user-content-syntax
[grps]: #user-content-grps
[grp]: #user-content-grps
[refs]: #user-content-refs
[ref]: #user-content-refs
[blk]: #user-content-blk
[cond]: #user-content-cond
[def]: #user-content-def
[incl]: #user-content-incl
[ins]: #user-content-ins
[blk-construct]: #user-content-blk-construct
[cond-construct]: #user-content-cond-construct
[def-construct]: #user-content-def-construct
[incl-construct]: #user-content-incl-construct
[ins-construct]: #user-content-ins-construct
[blk-members]: #user-content-blk-members
[cond-members]: #user-content-cond-members
[def-members]: #user-content-def-members
[incl-members]: #user-content-incl-members
[ins-members]: #user-content-ins-members
[blk-methods]: #user-content-blk-methods
[cond-methods]: #user-content-cond-methods
[def-methods]: #user-content-def-methods
[incl-methods]: #user-content-incl-methods
[ins-methods]: #user-content-ins-methods
[root-scope]: #user-content-root-scope
[open-cmd]: #user-content-open-cmd
[close-cmd]: #user-content-close-cmd

<a name="grps"></a>
## Groups
[Group][grps] *commands* are how you define scopes of code that can be referenced from other [file][file] or [root][root-scope] scopes (i.e. let's avoid infinite include or insert loops -- meaning you cannot reference [groups][grps] within the same [root scope][root-scope]) and that can be flexibly enabled or disabled. Every [group][grps] *command* type has an [open][open-cmd] and [close][close-cmd] *command*.

<a name="root-scope"></a>
### Root Scope
The term *root scope* refers to every *command* whose parent scope is the [file][file] (i.e. not defined within another *command's* scope).

<a name="open-cmd"></a>
### Open Command
The [open][open-cmd] *command* starts a new group. All three [group][grps] *command* types use three curly open brackets, `"{{{"`, within the *action* to denote an [open][open-cmd] *command* (e.g. `"/// #{{{ @tag id"`).

<a name="close-cmd"></a>
### Close Command
The [close][close-cmd] *command* ends an existing group. All three [group][grps] *command* types require [groups][grps] to close the most recent [group][grps] first and that the [tag][blk-tag] and [ID][blk-id] of the [close][close-cmd] *command* exactly match that of the [open][open-cmd] *command*. All three [group][grps] *command* types also use three curly close brackets, `"}}}"`, within the *action* to denote a [close][close-cmd] *command* (e.g. `"/// #}}} @tag id"`).

### GOTO
- [Block Class][blk]
  - [Constructor][blk-construct]
  - [Members][blk-members]
  - [Methods][blk-methods]
- [Conditional Class][cond]
  - [Constructor][cond-construct]
  - [Members][cond-members]
  - [Methods][cond-methods]
- [Macro Class][def]
  - [Constructor][def-construct]
  - [Members][def-members]
  - [Methods][def-methods]
<br>

<a name="blk"></a>
## Block Class
A general [grouping][grps] *command* that may be [included][incl] from other [file][file] or [root][root-scope] scopes.

| Open Action | Close Action |
|:------------|:-------------|
| `"#{{{"`    | `"#}}}"`     |

- [Block Constructor][blk-construct]
- [Block Members][blk-members]
- [Block Methods][blk-methods]
  - [Blk.prototype.isClose][blk-is-close]
  - [Blk.prototype.setClose][blk-set-close]
<br>

[blk-is-close]: #user-content-blk-method-is-close
[blk-set-close]: #user-content-blk-method-set-close
[blk-is-close-params]: #user-content-blk-method-is-close-params
[blk-set-close-params]: #user-content-blk-method-set-close-params
[blk-is-close-returns]: #user-content-blk-method-is-close-returns
[blk-set-close-returns]: #user-content-blk-method-set-close-returns

<a name="blk-construct"></a>
### Block Constructor

| Constructor |
|:------------|
| `Blk`       |

|    | Parameter                                 | Data Type          | Description
|:---|:------------------------------------------|:-------------------|:------------
| 1  | <a name="blk-construct-open"></a>open     | *`!Line`*          | The opening [Line][line] instance.
| 2  | <a name="blk-construct-file"></a>file     | *`!File`*          | The parent [File][file] instance.
| 3  | <a name="blk-construct-parent"></a>parent | *`(?Blk\|?Cond)=`* | The parent [Blk][blk] or [Cond][cond] instance.
<br>

[blk-construct-open]: #user-content-blk-construct-open
[blk-construct-file]: #user-content-blk-construct-file
[blk-construct-parent]: #user-content-blk-construct-parent

<a name="blk-members"></a>
### Block Members

| Member                                   | Data Type                               | Description
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

<a name="blk-methods"></a>
### Block Methods

- [Blk.prototype.isClose][blk-is-close]
  - [Parameters][blk-is-close-params]
  - [Returns][blk-is-close-returns]
- [Blk.prototype.setClose][blk-set-close]
  - [Parameters][blk-set-close-params]
  - [Returns][blk-set-close-returns]

<a name="blk-method-is-close"></a>
### Blk.prototype.isClose
This method tests if a line of text is a valid closing [block][blk] *command* and if it matches the [block][blk] instance's [tag][blk-tag] and [ID][blk-id].

<a name="blk-method-is-close-params"></a>
#### Blk.prototype.isClose Parameters

|    | Parameter                                   | Data Type  | Description
|:---|:--------------------------------------------|:-----------|:------------
| 1  | <a name="blk-method-is-close-text"></a>text | *`string`* | The text of a [Line][line] instance to check.

[blk-is-close-text]: #user-content-blk-method-is-close-text

<a name="blk-method-is-close-returns"></a>
#### Blk.prototype.isClose Returns

| Data Type   | Description
|:------------|:------------
| *`boolean`* | The result of the [close][close-cmd] *command* test.

<a name="blk-method-set-close"></a>
### Blk.prototype.setClose
This method sets the [close][blk-close] property for the [Blk][blk] instance.

<a name="blk-method-set-close-params"></a>
#### Blk.prototype.setClose Parameters

|    | Parameter                                      | Data Type | Description
|:---|:-----------------------------------------------|:----------|:------------
| 1  | <a name="blk-method-set-close-close"></a>close | *`!Line`* | The closing [Line][line] instance.

[blk-set-close-close]: #user-content-blk-method-set-close-close

<a name="blk-method-set-close-returns"></a>
#### Blk.prototype.setClose Returns

| Data Type | Description
|:----------|:------------
| *`void`*  | This method does not return a value.
<br>


<a name="cond"></a>
### Conditional Class
A [grouping][grps] *command* that shows or hides itself based upon the [state][file-compile-state] `object` passed to [File.prototype.compile][file-compile] (i.e. it can be easily enabled or disabled at will). Currently, it may NOT be [referenced][refs] from other [file][file] or [root][root-scope] scopes.

| Open Action   | Close Action  |
|:--------------|:--------------|
| `"#if{{{"`    | `"#if}}}"`    |
| `"#ifnot{{{"` | `"#ifnot}}}"` |

<a name="cond-members"></a>
### Conditional Members

| Member                                    | Data Type                               | Description
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

<a name="cond-methods"></a>
### Conditional Methods
<br>


<a name="def"></a>
## Define Class
A special [grouping][grps] *command* for defining a simple C-like macro. [Define][def] *commands* must be defined in the root scope of a [file][file] before all other *command* types. [Define][def] *commands* may be [inserted][ins] from all other [File][file], [Block][blk], or [Conditional][cond] scopes.

| Open Action | Close Action | Constructor | Description
|:------------|:-------------|:------------|:------------
| `"#def{{{"` | `"#def}}}"`  | `Def`       | 

<a name="def-members"></a>
### Define Members

| Member                               | Data Type         | Description
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

<a name="def-methods"></a>
### Define Methods
<br>


<a name="refs"></a>
## References
<ADD-DESCRIP>

### GOTO
- [Include Class](#user-content-incl)
- [Insert Class](#user-content-ins)


<a name="incl"></a>
## Include Class

| Action       | Constructor | Description
|:-------------|:------------|:------------
| `"#include"` | `Incl`      | <ADD-DESCRIP>

<a name="incl-members"></a>
### Include Members

| Member | Data Type         | Description
|:-------|:------------------|:------------
| type   | *`!Object`*       | A pointer to a unique `object` instance designated for the `Incl` class.
| tag    | *`string`*        | The `Incl` instance's *tag* name (e.g. `"/// #include @tag id"`).
| id     | *`string`*        | The `Incl` instance's *ID* name (e.g. `"/// #include @tag id"`).
| path   | *`string`*        | The `Incl` instance's *path* value (e.g. `"/// #include @tag id ./path/to/file.js"`).
| file   | *`!File`*         | A pointer to the parent `File` instance.
| line   | *`!Line`*         | A pointer to defining `Line` instance.
| parent | *`(?Blk\|?Cond)`* | A pointer to the parent `Blk` or `Cond` instance. It is `null` if it is at the root scope of the `File` instance (i.e. it becomes a [root scope](#user-content-root-scope) *command*).
| blk    | *`!Blk`*          | A pointer to the included `Blk` instance.

<a name="incl-methods"></a>
### Include Methods


<a name="ins"></a>
## Insert Class

| Action      | Constructor | Description
|:------------|:------------|:------------
| `"#insert"` | `Ins`       | <ADD-DESCRIP>

<a name="ins-members"></a>
### Insert Members

| Member | Data Type         | Description
|:-------|:------------------|:------------
| type   | *`!Object`*       | A pointer to a unique `object` instance designated for the [Ins][ins] class.
| tag    | *`string`*        | The [Ins][ins] instance's [tag][ins-tag] name (e.g. `"/// #insert @tag id"`).
| id     | *`string`*        | The [Ins][ins] instance's [ID][ins-id] name (e.g. `"/// #insert @tag id"`).
| path   | *`string`*        | The [Ins][ins] instance's [path][ins-path] value (e.g. `"/// #insert @tag id ./path/to/file.js"`).
| file   | *`!File`*         | A pointer to the parent [File][file] instance.
| line   | *`!Line`*         | A pointer to defining [Line][line] instance.
| def    | *`!Def`*          | A pointer to the included [Def][def] instance.
| index  | *`number`*        | The index of the defining [Line][line] instance's place in the [File][file] instance's [lines][file-lines] `array`.
<br>

[ins-type]: #user-content-ins-member-type
[ins-tag]: #user-content-ins-member-tag
[ins-id]: #user-content-ins-member-id
[ins-path]: #user-content-ins-member-path
[ins-file]: #user-content-ins-member-file
[ins-line]: #user-content-ins-member-line
[ins-def]: #user-content-ins-member-def
[ins-index]: #user-content-ins-member-index

<a name="ins-methods"></a>
### Insert Methods


