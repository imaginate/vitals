# Compile Class & Syntax Specs
This guide gives an overview and defines each member and method of every compile class and provides descriptive details for the compile syntax within the source.

## GOTO
- [File System](#user-content-fs)
  - [Directories](#user-content-dir)
  - [Files](#user-content-file)
  - [Lines](#user-content-line)
- [Source Syntax](#user-content-syntax)
  - [Groups](#user-content-grps)
    - [Blocks](#user-content-blk)
    - [Conditionals](#user-content-cond)
    - [Macros](#user-content-def)
  - [References](#user-content-refs)
    - [Includes](#user-content-incl)
    - [Inserts](#user-content-ins)


<a name="fs"></a>
## File System
The file-system classes wrap different file-system components for the compiler.

### GOTO
- [Directories](#user-content-dir)
- [Files](#user-content-file)
- [Lines](#user-content-line)


<a name="dir"></a>
## Directory Class

 Constructor | Description
:------------|:------------
 `Dir`       | The `Dir` class wraps each directory node within the *src* tree.

<a name="dir-members"></a>
### Directory Members

 Member | Data Type          | Description
:------ |:----------         |:------------
 type   | *`!Object`*        | A pointer to a unique `object` instance designated for the `Dir` class.
 name   | *`string`*         | The `Dir` instance's directory name.
 tree   | *`string`*         | The `Dir` instance's directory path relative to the root `Dir` instance (`"./"` not included). A forward slash is appended to the end of every `Dir` instance tree except for the root `Dir` instance which has an empty tree.
 path   | *`string`*         | The `Dir` instance's absolute directory path.
 parent | *`?Dir`*           | A pointer to the `Dir` instance's parent `Dir` instance. It is `null` if it is the root `Dir` instance.
 dirs   | *`!Object<!Dir>`*  | A hash map of all of the child `Dir` instances within the `Dir` instance.
 files  | *`!Object<!File>`* | A hash map of all of the child `File` instances within the `Dir` instance.

<a name="dir-methods"></a>
### Directory Methods

 Method     | Description
:-------    |:------------
 load       | This method triggers the *load* method for all of the `Dir` instance's child `Dir` and `File` instances.
 preprocess | This method triggers the *preprocess* method for all of the `Dir` instance's child `Dir` and `File` instances.
 process    | This method triggers the *process* method for all of the `Dir` instance's child `Dir` and `File` instances.
 compile    | This method triggers the *compile* method for the designated `File` instance. It takes the following three parameters: a relative *src* file path `string` (RELATIVE TO THE ROOT `Dir` -- NO ABSOLUTE PATHS), an absolute or relative *dest* file path `string` (RELATIVE TO THE CWD), and an `object` of hashed `Cond` keys and `boolean` values.


<a name="file"></a>
## File Class

 Constructor | Description
:------------|:------------
 `File`      | The `File` class wraps each file node within the *src* tree.

<a name="file-members"></a>
### File Members

 Member  | Data Type                               | Description
:------- |:----------                              |:------------
 type    | *`!Object`*                             | A pointer to a unique `object` instance designated for the `File` class.
 name    | *`string`*                              | The `File` instance's file name.
 tree    | *`string`*                              | The `File` instance's file path relative to the root `Dir` instance (`"./"` not included).
 path    | *`string`*                              | The `File` instance's absolute file path.
 parent  | *`!Dir`*                                | A pointer to the `File` instance's parent `Dir` instance.
 lines   | *`!Array<!Line>`*                       | An ordered `array` of all of the `Line` instances within the `File` instance scope (i.e. each `Ins` modifies this property).
 defs    | *`!Object<!Def>`*                       | A hash map of all of the `Def` instances within the scope of the `File` instance. The *hashed* key names combine each `Def` tag and id using a colon as the separator (e.g. `"tag:id"`).
 blks    | *`!Object<!Blk>`*                       | A hash map of all of the `Blk` instances within the root scope of the `File` instance. The *hashed* key names combine each `Blk` tag and id using a colon as the separator (e.g. `"tag:id"`).
 conds   | *`!Object<!Cond>`*                      | A hash map of all of the `Cond` instances within the root scope of the `File` instance. The *hashed* key names combine each `Cond` tag and id using a colon as the separator (e.g. `"tag:id"`).
 incls   | *`!Object<!Incl>`*                      | A hash map of all of the `Incl` instances within the root scope of the `File` instance. The *hashed* key names combine each `Incl` tag and id using a colon as the separator (e.g. `"tag:id"`).
 inserts | *`!Array<!Ins>`*                        | An ordered `array` of all of the `Ins` instances within the `File` instance.
 content | *`!Array<(!Line\|!Blk\|!Cond\|!Incl)>`* | An ordered `array` of all of the `Line`, `Blk`, `Cond`, and `Incl` instances within the root scope of the `File` instance.

<a name="file-methods"></a>
### File Methods

 Method     | Description
:-------    |:------------
 load       | This method causes the `File` instance's *path* to be read, a new `Line` instance to be constructed and pushed to the `File` instance's *lines* `array` for each line within the `File`, a new `Def` instance to be constructed and defined in the `File` instance's *defs* `object` for each `Def` within the `File`, and each `Line` within the *lines* of each `Def` instance to be spliced from the `File` instance's *lines* `array`.
 preprocess | This method causes a new `Ins` instance to be constructed and pushed to the `File` instance's *inserts* `array` for each `Ins` within the `File`, each `Ins` instance's *line* `Line` to spliced from the `File` instance's *lines* `array`, and each `Line` from each `Ins` instance's *lines* `array` to be spliced to the `File` instance's *lines* `array`.
 process    | This method causes a new `Blk`, `Cond`, or `Incl` instance to be constructed and defined in the `File` instance's *blks*, *conds*, or *incls* `object` for each `Blk`, `Cond`, and `Incl` within the root scope of the `File` instance and the `File` instance's *content* `array` to be filled (in order of appearance) with each `Line`, `Blk`, `Cond`, and `Incl` within the root scope of the `File` instance.
 compile    | This method creates a compiled destination file (i.e. *dest*). It takes the following two parameters: an absolute or relative *dest* file path `string` (RELATIVE TO THE CWD) and an `object` of hashed `Cond` keys and `boolean` values. Note that all `Incl` loops are caught in this step.


<a name="line"></a>
## Line Class

 Constructor | Description
:------------|:------------
 `Line`      | The `Line` class wraps each line of text within every `File` instance.

<a name="line-members"></a>
### Line Members

 Member  | Data Type   | Description
:------- |:----------  |:------------
 type    | *`!Object`* | A pointer to a unique `object` instance designated for the `Line` class.
 file    | *`!File`*   | A pointer to the parent `File` instance of the `Line` instance.
 text    | *`string`*  | The `Line` instance's UTF-8 encoded text. Note that all end-of-line characters (e.g. line-feed or carriage-return) are trimmed.
 linenum | *`number`*  | A positive `integer` (i.e. a whole `number` greater than `0`) representing the `Line` instance's original position within its *file* `File` instance's context. Note that the first *linenum* in a `File` is `1` (i.e. one-based).

<a name="line-methods"></a>
### Line Methods

 Method   | Description
:-------  |:------------
 *`void`* | The `Line` class has no methods.


<a name="syntax"></a>
## Source Syntax
The compile syntax has a simple layout and structure. It is built on one pattern with few variations to comprise the five total syntax components available. The following rules relate to every compile command:
- <p><strong>No Sharing</strong></p><p>Each compile command must not share a line with any other syntax (e.g. JavaScript, JSDoc, etc).</p>
- <p><strong>Start With 3</strong></p><p>Each command must start with three forward slashes, <code>"///"</code>, followed by at least one space or tab character, <code>" "</code>. The three slashes can only be preceded by space or tab characters.</p>
- <p><strong>Hash It</strong></p><p>A hash tag, <code>"#"</code>, must follow the three forward slashes and whitespace (e.g. <code>"/// #"</code>).</p>
- <p><strong>Action Time</strong></p><p>The desired compile commmand must be specified immediately after the hash tag followed by at least one space or tab character (e.g. <code>"/// #if{{{ "</code> or <code>"/// #include "</code>).</p>
- <p><strong>Tag It</strong></p><p>An at symbol, <code>"@"</code>, followed by your choice of tag name (alphanumerics, underscores, dots, and dashes only) and at least one space or tab character must follow the action (e.g. <code>"/// #insert @tagname "</code> or <code>"/// #def}}} @tag-name "</code>).</p>
- <p><strong>ID It</strong></p><p>After the tag, you must assign a unique ID (alphanumerics, underscores, dots, dashes, and dollar signs only) (e.g. <code>"/// #{{{ @tagname uniqueID"</code> or <code>"/// #ifnot}}} @tag-name unique-id"</code>) relative to the current scope for the tag type (i.e. if you want to give two items in the same scope the same ID, you must give them different tag names).</p>
- <p><strong>Ref Directions</strong></p><p>For reference commands, you will likely need to define the relative path to file containing the group you want include or insert. In such cases, just add at least one space or tab character after the ID and the relative file path (e.g. <code>"/// #include @tagname uniqueID ../path/to/file.js"</code>). Note that space and tab characters are not allowed within file paths.</p>


### GOTO
- [Groups](#user-content-grps)
  - [Blocks](#user-content-blk)
  - [Conditionals](#user-content-cond)
  - [Macros](#user-content-def)
- [References](#user-content-refs)
  - [Includes](#user-content-incl)
  - [Inserts](#user-content-ins)


<a name="grps"></a>
## Groups
<ADD-DESCRIP>

### GOTO
- [Block Class](#user-content-blk)
- [Conditional Class](#user-content-cond)
- [Macro Class](#user-content-def)


<a name="blk"></a>
## Block Class

 Constructor | Description
:------------|:------------
 `Blk`       | <ADD-DESCRIP>

<a name="blk-members"></a>
### Block Members

 Member  | Data Type              | Description
:------- |:----------             |:------------
 type    | !Object                | A pointer to a unique object instance designated for each class.
 name    | !string                | The tag's name (e.g. `@tag-name`).
 id      | !string                | The tag's id (e.g. `@tag-name tag-id`).
 hash    | !string                | The hashed result of the tag's and each of its parent's tag name and id (e.g. `"parent-name:parent-id\|child-name:child-id"`).
 open    | !FileLine              | A pointer to opening FileLine instance.
 close   | !FileLine              | A pointer to closing FileLine instance.
 parent  | ?AnyBlockTag           | A pointer to tag's parent tag.
 kids    | !Array\<!AnyTag>       | An ordered `array` of the tags within this tag's scope.
 content | !Array\<!AnyLineOrTag> | An ordered `array` of the lines and tags within this tag's scope.

<a name="blk-methods"></a>
### Block Methods

 Method     | Description
:-------    |:------------


<a name="cond"></a>
### Conditional Class

 Constructor | Description
:------------|:------------
 `Cond`      | <ADD-DESCRIP>

<a name="cond-members"></a>
### Conditional Members

 Member  | Data Type              | Description
:------- |:----------             |:------------
 type    | !Object                | A pointer to a unique object instance designated for each class.
 state   | !boolean               | The tag's state. It is `true` if the tag's name is `"on"`, and it is `false` if the tag's name is `"off"`.
 name    | !string                | The tag's name (e.g. `@tag-name`).
 id      | !string                | The tag's id (e.g. `@tag-name tag-id`).
 hash    | !string                | The hashed result of the tag's and each of its parent's tag name and id (e.g. `"parent-name:parent-id\|child-name:child-id"`).
 open    | !FileLine              | A pointer to opening FileLine instance.
 close   | !FileLine              | A pointer to closing FileLine instance.
 parent  | ?AnyBlockTag           | A pointer to tag's parent tag.
 kids    | !Array\<!AnyTag>       | An ordered `array` of the tags within this tag's scope.
 content | !Array\<!AnyLineOrTag> | An ordered `array` of the lines and tags within this tag's scope.

<a name="cond-methods"></a>
### Conditional Methods

 Method     | Description
:-------    |:------------


<a name="def"></a>
## Macro Class

 Constructor | Description
:------------|:------------
 `Def`       | <ADD-DESCRIP>

<a name="def-members"></a>
### Macro Members

 Member | Data Type          | Description
:-------|:----------         |:------------
 type   | !Object            | A pointer to a unique object instance designated for each class.
 id     | !string            | The MacroDef instance's id (e.g. `@macro id`).
 open   | !FileLine          | A pointer to opening FileLine instance.
 close  | !FileLine          | A pointer to closing FileLine instance.
 lines  | !Array\<!FileLine> | An ordered `array` of the lines within the MacroDef instance's scope.

<a name="def-methods"></a>
### Macro Methods

 Method     | Description
:-------    |:------------


<a name="refs"></a>
## References
<ADD-DESCRIP>

### GOTO
- [Include Class](#user-content-incl)
- [Insert Class](#user-content-ins)


<a name="incl"></a>
## Include Class

 Constructor | Description
:------------|:------------
 `Incl`      | <ADD-DESCRIP>

<a name="incl-members"></a>
### Include Members

 Member  | Data Type          | Description
:------- |:----------         |:------------
| type   | !Object            | A pointer to a unique object instance designated for each class.
| name   | !string            | The tag's name (e.g. `@tag-name`).
| id     | !string            | The tag's id (e.g. `@tag-name tag-id`).
| hash   | !string            | The hashed result of the tag's and each of its parent's tag name and id (e.g. `"parent-name:parent-id\|child-name:child-id"`).
| line   | !FileLine          | A pointer to **defining** FileLine instance.
| file   | !File              | A pointer to the **included** File instance.
| parent | !AnyBlockTag       | A pointer to tag's parent tag.

<a name="incl-methods"></a>
### Include Methods

 Method     | Description
:-------    |:------------


<a name="ins"></a>
## Insert Class

 Constructor | Description
:------------|:------------
 `Ins`       | <ADD-DESCRIP>

<a name="ins-members"></a>
### Insert Members

 Member | Data Type | Description
:-------|:----------|:------------
 type   | !Object   | A pointer to a unique object instance designated for each class.
 id     | !string   | The IncludeMacro instance's id (e.g. `@macro id`).
 line   | !FileLine | A pointer to **defining** FileLine instance.
 file   | !File     | A pointer to the included MacroFile instance.
 def    | !MacroDef | A pointer to the included MacroDef instance.

<a name="ins-methods"></a>
### Insert Methods

 Method     | Description
:-------    |:------------


