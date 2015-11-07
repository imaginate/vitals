# The _vitals_ Makefile
A custom [makefile](https://github.com/imaginate/vitals/blob/master/make.js) is used to handle all [development tasks](https://github.com/imaginate/vitals/tree/master/tasks) for [vitals](https://github.com/imaginate/vitals).
- [Overview](#overview)
- [Examples](#examples)
- [Shortcuts](#shortcuts)
- [Task Methods](#task-methods)
- [Task Values](#task-values)


## Overview
Use the following to execute makefile tasks:
```bash
$ cd <vitals-root>
$ node make <task>[-method][=val] <task>[-method][=val]
```
Tasks are executed in the order given and may be repeated. You may view each task's source code in the [tasks directory](https://github.com/imaginate/vitals/tree/master/tasks) (each task is saved as ``` <taskname>.js ```).


## Examples
```bash
## The two dashes preceding each task are optional
$ node make --task
$ node make --task-method
$ node make --task-method-method
$ node make --task-method=value
$ node make --task=defaultValue-method-method
$ node make --task=defaultValue-method-method-method=value
```


## Shortcuts
| Shortcut                 | Command Equivalent                    |
| :----------------------- | :------------------------------------ |
| ```$ node make ```       | ```$ node make --dev ```              |
| ```$ node make --dev ``` | ```$ node make --compile --minify ``` |


## Task Methods
| Task    | Methods                  | Default Methods |
| :------ | :----------------------- | :-------------- |
| compile | browser,node             | browser,node    |
| minify  | src                      | src             |
| test    | base,full,method,section | base            |
| version | all                      | all             |


## Task Values
| Task    | Method    | Value            | Example                                      |
| :------ | :-------- | :--------------- | :------------------------------------------- |
| compile | node      | Vitals Section   | ```$ node make --compile-node=js ```         |
| minify  | src       | Source File Name | ```$ node make --minify=vitals ```           |
| test    | method    | Vitals Method    | ```$ node make --test-method=each ```        |
| test    | section   | Vitals Section   | ```$ node make --test-method=js ```          |
| test    | base,full | Mocha Options    | ```$ node make --test=bail+reporter=spec ``` |
| version | all       | Semantic Version | ```$ node make --version=1.2.4 ```           |


<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/vitals"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
