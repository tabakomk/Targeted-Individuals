var Favorite = (function() {
    // 初期設定
    var Favorite = function(options) {
        // オプションの値を表示してみます。
        console.log(options);
        // options にはmBaaSのアプリケーションキーとクライアントキーが入ってきます。
        if (typeof NCMB !== 'undefined') {
            this.ncmb = new NCMB(options.applicationKey, options.clientKey);
            // 保存先クラスを定義するところ
            this.FavoriteClass = this.ncmb.DataStore("favorite");
        }
        
        // 記事リストを指定するためのID
        this.listEl = "#feed-list";
        
        // アプリ＋端末を特定するためのuuidを取得
        this.uuid = getUuid();
        
        // お気に入りのOn/Offイベントの有効フラグ
        this.clickEnabled = true;
        
        // タップした時の処理を記述
        this.addClickHandler();
        
        // オプションが指定されている場合はその値で上書き
        if (options) {
            $.extend(this, options);
        }
    }
    
    // 全ての記事に対してお気に入り状況を反映させる
    Favorite.prototype.applyAll = function() {
        var self = this;
            $(this.listEl).children('li').each(function(index) {
            var item = $(this);
            self.apply(item);
        });
    };
    
    // 一つの記事に対してお気に入り状態を反映させる
    Favorite.prototype.apply = function(item) {        
        // 変数の定義
        /// 自分自身
        /// URL
        /// アイコン
        
        // お気に入り登録数を検索
            // 検索が成功した場合
            // 検索が失敗した場合
        // 自分がお気に入り登録済みか調べる
            // 登録済みであれば星マークを黄色に
            // 未登録の場合は星マークを黒に
    };
    
    // イベント処理を設定
    Favorite.prototype.addClickHandler = function() {
        var self = this;
        
        // 記事一覧の中のstarクラスに対してイベントを指定します。
        $(this.listEl).on('click', '.star', function(event) {
            // タップ設定が有効であれば処理を行います
            // これは二重処理の防止です
            if (self.clickEnabled == true) {
                // 一旦二重処理を防ぎます
                self.clickEnabled = false;
                
                // フラグは1秒後に立て直します
                setTimeout(function(){ self.clickEnabled = true; }, 1000);
                
                // 星マークのクラスで処理を判別します。
                if ($(this).hasClass('fa-star-o')) {
                    // 空であればお気に入り未登録→お気に入り登録処理
                    self.add($(this).closest('li'));
                } else {
                    // 塗りつぶされている場合はお気に入り登録済み→お気に入り解除処理
                    self.remove($(this).closest('li'));
                }
            }            
            event.stopPropagation();
        });
    };

    // お気に入り登録処理
    Favorite.prototype.add = function(item) {
        var self = this;
        
        // タップしたデータのURLを取得
        var url = item.data('link');
        
        // ここから下はダミーです。後ほど消します。
        var icon = item.find("i");
        icon.addClass('fa-star');
        icon.removeClass('fa-star-o');
        // ここまではダミーです。後ほど消します。
    
        // 保存するオブジェクトを生成
        // 保存したい値をセットし、保存
            // 保存が成功した場合
            // 保存が失敗した場合
    };

    // お気に入り解除処理
    Favorite.prototype.remove = function(item) {
        var self = this;
        var url = item.data('link');
        
        // uuidとurlの両方が合致するオブジェクトを検索し、見つけたものを削除する    
            // データが見つかった場合
                // 削除処理が成功した場合
                // 削除処理が失敗したばあい
            // エラーがあった場合
    };
 
    // アプリ+端末を特定するためのuuidを取得
    // uuidはアプリアンインストールで削除されます
    var getUuid = function() {
        var uuid = localStorage.getItem('uuid');
        if (uuid === null) {
          // uuid未生成の場合は新規に作る
          var S4 = function(){
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
          };
          uuid = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
          localStorage.setItem('uuid', uuid);
        }
        return uuid;
    };
    return Favorite;
})();
