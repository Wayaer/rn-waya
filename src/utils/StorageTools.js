import {AsyncStorage} from '../../index';
import Storage from './Storage';

let storage;

export default class StorageTools {
    /**
     * 本地持久化储存信息
     * @returns {Storage}
     */
    static getStorage() {
        if (storage === undefined) {
            storage = new Storage({
                size: 1000,
                // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
                // 如果不指定则数据只会保存在内存中，重启后即丢失
                storageBackend: AsyncStorage,
                defaultExpires: null,
                // 读写时在内存中缓存数据。默认启用。
                enableCache: true,
            });
        }
        return storage;
    }


    /**
     * 保存数据
     * @param key
     * @param object
     */
    static saveData(key, object) {
        this.isInit();
        storage.save({
            key: key,  // 注意:请不要在key中使用_下划线符号!
            data: object,
            expires: null,
        });
    }

    /**
     * 删除单个数据
     * @param key
     */
    static removeData(key) {
        this.isInit();
        storage.remove({
            key: key,
        });
    }

    /**
     * 移除所有"key-id"数据（但会保留只有key的数据）
     */
    static removeAll() {
        this.isInit();
        storage.clearMap();
    }

    /**
     * 清除某个key下的所有数据
     * @param key
     */
    static clearDataByKey(key) {
        this.isInit();
        storage.clearMapForKey(key).then(r => {
            console.log(r);
        });
    }

    /**
     * 查找某个key下的所有数据
     * @param key
     * @param successCallBack
     * @param errorCallback
     */
    static findData(key, successCallBack, errorCallback) {
        this.isInit();
        storage.load({
            key: key,
        }).then(data => {
            return successCallBack(data);
        }).catch((error) => {
            return errorCallback(error);
        });
    }

    /**
     * 查找某个key下的所有数据 同步
     * @param key
     */
    static async findAsyncData(key) {
        try {
            const value = await storage.load({
                key: key,
            });
            return value ? value : false;
        } catch (e) {
            return false;
        }
    }

    static isInit() {
        if (storage === undefined) {
            console.log('请先调用getStorage()进行初始化');
        }
    }
}
