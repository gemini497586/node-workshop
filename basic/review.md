# Code review

統一團隊內的coding style，以符合專案的設定。 像是程式的複雜性、功能性、命名有沒有意義或不一致、小習慣等等，必要時會同步修正專案的共同文件，可以幫助團隊在未來的整合、修改、檢視的過程更加順利流暢。

### Code review的原則

- 抓問題 → 程式能不能正常操作，有沒有什麼明顯的錯誤(潛在的bug)？
- coding style → 命名有沒有意義或不一致，符合專案設定的coding style
- 好維護與優化
    - 冗長的程式碼能不能拆分，避免god class的產生，導致後續牽一髮而動全身。
    - 調整特別複雜的程式片段（例如多次的資料庫查詢、多層的迴圈使用）
    - 一個function做一件事情，且命名與function得功能相符，避免後續更正出問題。
- 用整體專案的格局看待，給出技術上的建議
    - 假設有些改動根本不應該發生，應該馬上提出，避免方向錯誤、白做工。
    - 遇到多檔案時，由主要檔案開始。
- 盡快達成共識 → 避免專案停滯不前，多寫點備註能夠減少在溝通前彼此不清楚的地方，或當面討論。

### Code review的優點

程式是否能正常運作、命名方式是否一致、讓程式更一致且更有效率執行，在code review的時候如果發現錯誤，且及時修正，能減少後續解衝突的次數，除了修正錯誤外，也能觀察到別人寫code的習慣，同時是一種學習方式。

- 儘早debug
- 提高code的一致性、品質、好維護、閱讀性
- 更專注於專案上，有共同目標
- 互相學習不同寫法的特點

### Code review的缺點

- 畢竟是額外花做的事情，會增加團隊的開發成本。

根據Stack Overflow 2019 的報告，這項調查詢問每一個禮拜平均在Code Review花的時間：
有31.4%的工程師花2-3小時 Code Review；
有31.3%的工程師花4-5小時 Code Review。

[Stack Overflow Developer Survey 2019](https://insights.stackoverflow.com/survey/2019#work-_-code-review)

既然超過 60% 每週花費2-5小時進行code review，必然有它的價值與意義在，而我們第一次接觸，不熟悉的情況下，就會有另一個效率問題。

### 降低Code review的時間成本

跟開會一樣的花時間，避免壓迫到專案開發時間，在達到同等效益的情況下，減少Code Review要花的時間。

- review前重新聚焦目標，知道要改什麼
- 善用pull request 可以直接看到哪一段到哪裡進行修改
- 每一次review只看一個功能，跟git commit -m 一樣
- 確實做好每次的code review

### 總結

我們認為 Code review 的目的，是為了讓整個專案的code更好，為了更好，就需要注意哪些部分是必須的。實際執行時，需要考量時間成本，且同時兼顧code品質。最後因為 Code review 其實也是 Reviewer 和 Developer 的對話，讓團隊的所有人在維持好心情的情況下，去完成review也是很重要的課題。