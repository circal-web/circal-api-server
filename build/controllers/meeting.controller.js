"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingController = void 0;
const dbobjects_1 = require("../database/dbobjects");
const tsoa_1 = require("tsoa");
let MeetingController = class MeetingController extends tsoa_1.Controller {
    async getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let itemsFound = await dbobjects_1.MeetingModel.find({});
                let items = itemsFound.map((item) => {
                    return { _id: item._id, title: item.title, startTime: item.startTime,
                        endTime: item.endTime, preMeetingAgenda: item.preMeetingAgenda, attendingUsers: item.attendingUsers,
                        status: item.status };
                });
                resolve(items);
            }
            catch (err) {
                this.setStatus(500);
                reject(err);
            }
        });
    }
    async getById(id) {
        return new Promise(async (resolve, reject) => {
            let itemsFound = await dbobjects_1.MeetingModel.findById(id);
            resolve(itemsFound);
        });
    }
    async create(createRequest) {
        return new Promise(async (resolve, reject) => {
            const item = new dbobjects_1.MeetingModel(createRequest);
            item.save(undefined, (err, item) => {
                if (item) {
                    let savedItem = {
                        _id: item._id, title: item.title, startTime: item.startTime,
                        endTime: item.endTime, preMeetingAgenda: item.preMeetingAgenda, attendingUsers: item.attendingUsers,
                        status: item.status
                    };
                    resolve(savedItem);
                }
                else {
                    reject({});
                }
            });
        });
    }
    async remove(id) {
        return new Promise(async (resolve, reject) => {
            await dbobjects_1.MeetingModel.findByIdAndRemove(id);
            resolve();
        });
    }
    async update(id, updateRequest) {
        return new Promise(async (resolve, reject) => {
            let valuesToChange = { title: updateRequest.title, startTime: updateRequest.startTime,
                endTime: updateRequest.endTime, preMeetingAgenda: updateRequest.preMeetingAgenda,
                attendingUsers: updateRequest.attendingUsers, status: updateRequest.status };
            await dbobjects_1.MeetingModel.findByIdAndUpdate(id, valuesToChange);
            resolve();
        });
    }
    async smartScheduling(id) {
        return new Promise(async (resolve, reject) => {
        });
    }
};
__decorate([
    tsoa_1.Get('/all')
], MeetingController.prototype, "getAll", null);
__decorate([
    tsoa_1.Get('/{id}')
], MeetingController.prototype, "getById", null);
__decorate([
    tsoa_1.Post(),
    __param(0, tsoa_1.Body())
], MeetingController.prototype, "create", null);
__decorate([
    tsoa_1.Delete('/{id}')
], MeetingController.prototype, "remove", null);
__decorate([
    tsoa_1.Put('/{id}'),
    __param(1, tsoa_1.Body())
], MeetingController.prototype, "update", null);
__decorate([
    tsoa_1.Get('/schedule/{id}')
], MeetingController.prototype, "smartScheduling", null);
MeetingController = __decorate([
    tsoa_1.Route('/meeting')
], MeetingController);
exports.MeetingController = MeetingController;
//# sourceMappingURL=meeting.controller.js.map