CREATE TABLE "public"."pep_activities" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "name" jsonb NOT NULL,
  "description" jsonb,
  "short_description" jsonb,
  "thumbnail_creative_id" varchar(64)[] COLLATE "pg_catalog"."default",
  "visibility_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "mode_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "is_featured" bool DEFAULT false,
  "display_order" int4 DEFAULT 0,
  "status_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "publish_at" timestamptz(6) NOT NULL,
  "start_at" timestamptz(6) NOT NULL,
  "end_at" timestamptz(6) NOT NULL,
  "type_id" varchar(64)[] COLLATE "pg_catalog"."default" NOT NULL,
  "category_id" varchar(64)[] COLLATE "pg_catalog"."default" NOT NULL,
  "timezone" varchar(50) COLLATE "pg_catalog"."default" DEFAULT 'UTC'::character varying,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activities_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "chk_activities_publish" CHECK (publish_at <= start_at),
  CONSTRAINT "chk_activities_dates" CHECK (end_at > start_at)
)
;

ALTER TABLE "public"."pep_activities" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activities"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activities"."name" IS '活动名称：多语言';

COMMENT ON COLUMN "public"."pep_activities"."description" IS '活动描述：多语言';

COMMENT ON COLUMN "public"."pep_activities"."short_description" IS '活动简短描述：多语言';

COMMENT ON COLUMN "public"."pep_activities"."thumbnail_creative_id" IS '缩略图素材ID：pep_creatives.id';

COMMENT ON COLUMN "public"."pep_activities"."visibility_id" IS '可见性ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activities"."mode_id" IS '活动模式ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activities"."is_featured" IS '是否精选';

COMMENT ON COLUMN "public"."pep_activities"."display_order" IS '展示排序';

COMMENT ON COLUMN "public"."pep_activities"."status_id" IS '状态ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activities"."publish_at" IS '发布时间';

COMMENT ON COLUMN "public"."pep_activities"."start_at" IS '开始时间';

COMMENT ON COLUMN "public"."pep_activities"."end_at" IS '结束时间';

COMMENT ON COLUMN "public"."pep_activities"."type_id" IS '活动类型ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activities"."category_id" IS '活动分类ID：pep_activity_categories.id';

COMMENT ON COLUMN "public"."pep_activities"."timezone" IS '时区';

COMMENT ON COLUMN "public"."pep_activities"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activities"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activities"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activities"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activities"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activities"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activities"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activities"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activities" IS '活动主表';



CREATE TABLE "public"."pep_activity_actions" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" varchar(64) COLLATE "pg_catalog"."default",
  "action_type_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "action_at" timestamptz(6),
  "timeslot_id" int4 NOT NULL,
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_actions_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_activity_actions_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."pep_activities" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
)
;

ALTER TABLE "public"."pep_activity_actions" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_actions"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_actions"."user_id" IS '操作用户ID：pep_users.id';

COMMENT ON COLUMN "public"."pep_activity_actions"."action_type_id" IS '操作类型ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activity_actions"."action_at" IS '操作时间';

COMMENT ON COLUMN "public"."pep_activity_actions"."timeslot_id" IS '时段ID：pep_activity_timeslots.id';

COMMENT ON COLUMN "public"."pep_activity_actions"."activity_id" IS '活动ID：pep_activities.id';

COMMENT ON COLUMN "public"."pep_activity_actions"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_actions"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_actions"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_actions"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_actions"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_actions"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_actions"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_actions"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_actions" IS '活动操作日志（register/waitlist/approve/reject/cancel/update）';


CREATE TABLE "public"."pep_activity_additional_info" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "info_title" jsonb,
  "info_text" jsonb,
  "sequence" int4,
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_additional_info_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_activity_additional_info_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."pep_activities" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "uq_activity_additional_info_activity" UNIQUE ("activity_id")
)
;

ALTER TABLE "public"."pep_activity_additional_info" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_additional_info"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."info_title" IS '信息标题：多语言';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."info_text" IS '信息内容：多语言';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."sequence" IS '展示顺序';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."activity_id" IS '活动ID';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_additional_info"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_additional_info" IS '活动附加信息（条款、隐私、交通、退款、取消政策等）';


CREATE TABLE "public"."pep_activity_administrators" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" int4 NOT NULL,
  "role_id" int4 NOT NULL,
  "permissions" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "display_order" int4 DEFAULT 0,
  "is_active" bool DEFAULT true,
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_administrators_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_activity_administrators_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."pep_activities" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "uq_activity_administrators_activity_user" UNIQUE ("activity_id", "user_id"),
  CONSTRAINT "chk_activity_administrators_order" CHECK (display_order >= 0)
)
;

ALTER TABLE "public"."pep_activity_administrators" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_administrators"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_administrators"."user_id" IS '用户ID：pep_users.id';

COMMENT ON COLUMN "public"."pep_activity_administrators"."role_id" IS '角色ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activity_administrators"."permissions" IS '权限配置：JSON';

COMMENT ON COLUMN "public"."pep_activity_administrators"."display_order" IS '展示排序';

COMMENT ON COLUMN "public"."pep_activity_administrators"."is_active" IS '是否启用';

COMMENT ON COLUMN "public"."pep_activity_administrators"."activity_id" IS '活动ID：pep_activities.id';

COMMENT ON COLUMN "public"."pep_activity_administrators"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_administrators"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_administrators"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_administrators"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_administrators"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_administrators"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_administrators"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_administrators"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_administrators" IS '活动管理员';


CREATE TABLE "public"."pep_activity_capacity_settings" (
  "id" int4 NOT NULL DEFAULT nextval('pep_activity_capacity_settings_id_seq'::regclass),
  "capacity_type_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "seats" int4 NOT NULL DEFAULT 99999,
  "is_allow_overbooking" bool DEFAULT false,
  "overbooking_seats" int4 DEFAULT 0,
  "is_waitlist_enabled" bool DEFAULT false,
  "waitlist_seats" int4 DEFAULT 0,
  "is_allow_accompany" bool DEFAULT false,
  "max_accompany" int4 DEFAULT 0,
  "timeslot_id" int4 NOT NULL,
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_capacity_settings_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "uq_activity_capacity_settings_activity" UNIQUE ("activity_id"),
  CONSTRAINT "chk_capacity_settings_waitlist" CHECK (waitlist_seats >= 0),
  CONSTRAINT "chk_capacity_settings_accompany" CHECK (max_accompany >= 0),
  CONSTRAINT "chk_capacity_settings_seats" CHECK (seats > 0),
  CONSTRAINT "chk_capacity_settings_overbooking" CHECK (overbooking_seats >= 0)
)
;

ALTER TABLE "public"."pep_activity_capacity_settings" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."id" IS '主键ID（自增）';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."capacity_type_id" IS '容量类型ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."seats" IS '座位数';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."is_allow_overbooking" IS '是否允许超额预订';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."overbooking_seats" IS '超额预订座位数';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."is_waitlist_enabled" IS '是否启用候补名单';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."waitlist_seats" IS '候补座位数';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."is_allow_accompany" IS '是否允许携带同行人';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."max_accompany" IS '最大同行人数';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."timeslot_id" IS '时段ID：pep_activity_timeslots.id';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."activity_id" IS '活动ID：pep_activities.id';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_capacity_settings"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_capacity_settings" IS '活动容量设置';



CREATE TABLE "public"."pep_activity_contact_settings" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "contact_email" varchar(255) COLLATE "pg_catalog"."default",
  "contact_phone" varchar(50) COLLATE "pg_catalog"."default",
  "contact_name" varchar(255) COLLATE "pg_catalog"."default",
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_contact_settings_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_activity_contact_settings_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."pep_activities" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "uq_activity_contact_settings_activity" UNIQUE ("activity_id")
)
;

ALTER TABLE "public"."pep_activity_contact_settings" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."contact_email" IS '联系人邮箱';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."contact_phone" IS '联系人电话';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."contact_name" IS '联系人姓名';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."activity_id" IS '活动ID：pep_activities.id';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_contact_settings"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_contact_settings" IS '活动联系设置';


CREATE TABLE "public"."pep_activity_enrollment_settings" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "start_at" timestamptz(6),
  "end_at" timestamptz(6),
  "unenrollment_deadline_at" timestamptz(6),
  "is_require_approval" bool DEFAULT false,
  "is_allow_cancellation" bool DEFAULT true,
  "cancellation_deadline_at" timestamptz(6),
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_enrollment_settings_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_activity_enrollment_settings_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."pep_activities" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "uq_activity_enrollment_settings_activity" UNIQUE ("activity_id"),
  CONSTRAINT "chk_enrollment_settings_dates" CHECK (end_at IS NULL OR start_at IS NULL OR end_at >= start_at)
)
;

ALTER TABLE "public"."pep_activity_enrollment_settings" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."start_at" IS '报名开始时间';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."end_at" IS '报名结束时间';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."unenrollment_deadline_at" IS '取消报名截止时间';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."is_require_approval" IS '是否需要审批';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."is_allow_cancellation" IS '是否允许取消';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."cancellation_deadline_at" IS '取消截止时间';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."activity_id" IS '活动ID：pep_activities.id';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_enrollment_settings"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_enrollment_settings" IS '活动报名设置';


CREATE TABLE "public"."pep_activity_feature_settings" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "enable_timeslot" bool DEFAULT false,
  "enable_enrollment" bool DEFAULT false,
  "enable_guest_enrolment" bool DEFAULT false,
  "enable_ticket" bool DEFAULT false,
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_feature_settings_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_activity_feature_settings_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."pep_activities" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "uq_activity_feature_settings_activity" UNIQUE ("activity_id")
)
;

ALTER TABLE "public"."pep_activity_feature_settings" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."enable_timeslot" IS '是否启用时段';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."enable_enrollment" IS '是否启用报名';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."enable_guest_enrolment" IS '是否启用访客报名';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."enable_ticket" IS '是否启用票务：不启用就是免费的';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."activity_id" IS '活动ID：pep_activities.id';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_feature_settings"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_feature_settings" IS '活动功能设置';


CREATE TABLE "public"."pep_activity_organizers" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "organizer_id" varchar(64) COLLATE "pg_catalog"."default",
  "organizer_role_id" varchar(64) COLLATE "pg_catalog"."default",
  "display_order" int4 DEFAULT 0,
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_organizers_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_activity_organizers_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."pep_activities" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "chk_activity_organizers_order" CHECK (display_order >= 0)
)
;

ALTER TABLE "public"."pep_activity_organizers" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_organizers"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_organizers"."organizer_id" IS '主办方ID：pep_users.id';

COMMENT ON COLUMN "public"."pep_activity_organizers"."organizer_role_id" IS '主办方角色ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activity_organizers"."display_order" IS '展示排序';

COMMENT ON COLUMN "public"."pep_activity_organizers"."activity_id" IS '活动ID：pep_activities.id';

COMMENT ON COLUMN "public"."pep_activity_organizers"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_organizers"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_organizers"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_organizers"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_organizers"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_organizers"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_organizers"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_organizers"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_organizers" IS '活动与主办方关联';


CREATE TABLE "public"."pep_activity_registrations" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "user_id" varchar(64) COLLATE "pg_catalog"."default",
  "accompany_count" int4 DEFAULT 0,
  "headcount_unit" int4 NOT NULL,
  "status_id" varchar(64) COLLATE "pg_catalog"."default",
  "is_waitlist" bool DEFAULT false,
  "registered_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "approved_at" timestamptz(6),
  "approved_by_id" int4,
  "cancelled_at" timestamptz(6),
  "cancelled_by_id" int4,
  "cancellation_reason" text COLLATE "pg_catalog"."default",
  "timeslot_id" int4 NOT NULL,
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  "ticket_id" varchar(64) COLLATE "pg_catalog"."default",
  CONSTRAINT "pep_activity_registrations_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_activity_registrations_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."pep_activities" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "chk_registrations_accompany" CHECK (accompany_count >= 0)
)
;

ALTER TABLE "public"."pep_activity_registrations" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_registrations"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_registrations"."user_id" IS '用户ID：pep_users.id';

COMMENT ON COLUMN "public"."pep_activity_registrations"."accompany_count" IS '同行人数';

COMMENT ON COLUMN "public"."pep_activity_registrations"."headcount_unit" IS '人数单位';

COMMENT ON COLUMN "public"."pep_activity_registrations"."status_id" IS '报名状态ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activity_registrations"."is_waitlist" IS '是否候补名单';

COMMENT ON COLUMN "public"."pep_activity_registrations"."registered_at" IS '报名时间';

COMMENT ON COLUMN "public"."pep_activity_registrations"."approved_at" IS '审批通过时间';

COMMENT ON COLUMN "public"."pep_activity_registrations"."approved_by_id" IS '审批人ID：pep_users.id';

COMMENT ON COLUMN "public"."pep_activity_registrations"."cancelled_at" IS '取消时间';

COMMENT ON COLUMN "public"."pep_activity_registrations"."cancelled_by_id" IS '取消人ID：pep_users.id';

COMMENT ON COLUMN "public"."pep_activity_registrations"."cancellation_reason" IS '取消原因';

COMMENT ON COLUMN "public"."pep_activity_registrations"."timeslot_id" IS '时段ID';

COMMENT ON COLUMN "public"."pep_activity_registrations"."activity_id" IS '活动ID';

COMMENT ON COLUMN "public"."pep_activity_registrations"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_registrations"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_registrations"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_registrations"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_registrations"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_registrations"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_registrations"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_registrations"."deleted_at" IS '删除时间';

COMMENT ON COLUMN "public"."pep_activity_registrations"."ticket_id" IS '票种ID：pep_activity_tickets.id';

COMMENT ON TABLE "public"."pep_activity_registrations" IS '活动报名记录';



CREATE TABLE "public"."pep_activity_registrations_ticket" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "registration_id" varchar(64) COLLATE "pg_catalog"."default",
  "ticket_pass_id" varchar(64) COLLATE "pg_catalog"."default",
  "ticket_pass_holder_id" varchar(64) COLLATE "pg_catalog"."default",
  "sequence" int4,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6),
  "is_deleted" bool,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_registrations_ticket_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_activity_registration_ticket_passes_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "public"."pep_activity_registrations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
)
;

ALTER TABLE "public"."pep_activity_registrations_ticket" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."registration_id" IS '报名记录ID：pep_activity_registrations.id';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."ticket_pass_id" IS '票务通票ID：pep_ticket_passes.id';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."ticket_pass_holder_id" IS '持票人ID：pep_ticket_pass_holders.id';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."sequence" IS '排序';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_registrations_ticket"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_registrations_ticket" IS '报名与票务通票/持票人关联';



CREATE TABLE "public"."pep_activity_timeslots" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "slot_date" date NOT NULL,
  "start_time" time(6) NOT NULL,
  "end_time" time(6) NOT NULL,
  "display_order" int4 DEFAULT 0,
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_timeslots_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "chk_activity_timeslots_time" CHECK (end_time > start_time)
)
;

ALTER TABLE "public"."pep_activity_timeslots" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_timeslots"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."slot_date" IS '时段日期';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."start_time" IS '开始时间';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."end_time" IS '结束时间';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."display_order" IS '展示排序';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."activity_id" IS '活动ID：pep_activities.id';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_timeslots" IS '活动时段表';



CREATE TABLE "public"."pep_activity_timeslots_physical" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "location_id" varchar(64) COLLATE "pg_catalog"."default",
  "space_id" varchar(64) COLLATE "pg_catalog"."default",
  "address_text" jsonb,
  "geom" geometry(POINT, 4326),
  "additional_settings" jsonb,
  "timeslot_id" varchar(64) COLLATE "pg_catalog"."default",
  "activity_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_timeslot_physical_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_activity_timeslot_physical_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."pep_activities" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "uq_activity_physical_activity" UNIQUE ("activity_id")
)
;

ALTER TABLE "public"."pep_activity_timeslots_physical" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."location_id" IS '地点ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."space_id" IS '空间ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."address_text" IS '手动输入地址：多语言';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."geom" IS '经纬度坐标';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."additional_settings" IS '额外配置';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."timeslot_id" IS '时段ID：pep_activity_timeslots.id';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."activity_id" IS '活动ID：pep_activities.id';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_physical"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_timeslots_physical" IS '线下实体场地时段';



CREATE TABLE "public"."pep_activity_timeslots_virtual" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "platform_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "virtual_url" varchar(2000) COLLATE "pg_catalog"."default",
  "meeting_id" varchar(64) COLLATE "pg_catalog"."default",
  "meeting_password" varchar(2000) COLLATE "pg_catalog"."default",
  "meeting_passcode" varchar(200) COLLATE "pg_catalog"."default",
  "dial_in_numbers" jsonb,
  "dial_in_password" varchar(200) COLLATE "pg_catalog"."default",
  "additional_settings" jsonb,
  "timeslot_id" varchar(64) COLLATE "pg_catalog"."default",
  "activity_id" varchar(64) COLLATE "pg_catalog"."default",
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_activity_timeslot_virtual_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "uq_activity_virtual_activity" UNIQUE ("activity_id")
)
;

ALTER TABLE "public"."pep_activity_timeslots_virtual" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."platform_id" IS '虚拟平台ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."virtual_url" IS '虚拟会议链接';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."meeting_id" IS '会议ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."meeting_password" IS '会议密码';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."meeting_passcode" IS '会议参会码';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."dial_in_numbers" IS '拨入号码列表';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."dial_in_password" IS '拨入密码';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."additional_settings" IS '额外配置';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."timeslot_id" IS '时段ID：pep_activity_timeslots.id';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."activity_id" IS '活动ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_activity_timeslots_virtual"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_activity_timeslots_virtual" IS '线上虚拟会议时段';



CREATE TABLE "public"."pep_categories" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "name" jsonb NOT NULL,
  "description" jsonb,
  "color_code" varchar(7) COLLATE "pg_catalog"."default",
  "icon_creative_id" varchar(64) COLLATE "pg_catalog"."default",
  "status_id" varchar(64) COLLATE "pg_catalog"."default",
  "display_order" int4 DEFAULT 0,
  "parent_id" varchar(64) COLLATE "pg_catalog"."default",
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_categories_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "chk_categories_order" CHECK (display_order >= 0),
  CONSTRAINT "chk_categories_no_self_parent" CHECK (parent_id IS NULL OR parent_id::text <> id::text),
  CONSTRAINT "chk_categories_color" CHECK (color_code IS NULL OR length(color_code::text) = 7 AND color_code::text ~ '^#[0-9A-Fa-f]{6}$'::text)
)
;

ALTER TABLE "public"."pep_categories" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_categories"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_categories"."name" IS '分类名称：多语言';

COMMENT ON COLUMN "public"."pep_categories"."description" IS '分类描述：多语言';

COMMENT ON COLUMN "public"."pep_categories"."color_code" IS '颜色代码';

COMMENT ON COLUMN "public"."pep_categories"."icon_creative_id" IS '图标素材ID：pep_creatives.id';

COMMENT ON COLUMN "public"."pep_categories"."status_id" IS '状态ID：pep_data_dictionaries.id';

COMMENT ON COLUMN "public"."pep_categories"."display_order" IS '展示排序';

COMMENT ON COLUMN "public"."pep_categories"."parent_id" IS '父分类ID：pep_categories.id';

COMMENT ON COLUMN "public"."pep_categories"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_categories"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_categories"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_categories"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_categories"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_categories"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_categories"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_categories"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_categories" IS '活动分类';



CREATE TABLE "public"."pep_organizers" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "name" jsonb NOT NULL,
  "description" jsonb,
  "logo_creative_id" int4,
  "is_active" bool DEFAULT true,
  "display_order" int4 DEFAULT 0,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_organizers_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "chk_organizers_order" CHECK (display_order >= 0)
)
;

ALTER TABLE "public"."pep_organizers" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_organizers"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_organizers"."name" IS '主办方名称：多语言';

COMMENT ON COLUMN "public"."pep_organizers"."description" IS '主办方描述：多语言';

COMMENT ON COLUMN "public"."pep_organizers"."logo_creative_id" IS 'Logo素材ID：pep_creatives.id';

COMMENT ON COLUMN "public"."pep_organizers"."is_active" IS '是否启用';

COMMENT ON COLUMN "public"."pep_organizers"."display_order" IS '展示排序';

COMMENT ON COLUMN "public"."pep_organizers"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_organizers"."created_by" IS '创建人ID';

COMMENT ON COLUMN "public"."pep_organizers"."created_at" IS '创建时间';

COMMENT ON COLUMN "public"."pep_organizers"."updated_by" IS '更新人ID';

COMMENT ON COLUMN "public"."pep_organizers"."updated_at" IS '更新时间';

COMMENT ON COLUMN "public"."pep_organizers"."is_deleted" IS '是否已删除';

COMMENT ON COLUMN "public"."pep_organizers"."deleted_by" IS '删除人ID';

COMMENT ON COLUMN "public"."pep_organizers"."deleted_at" IS '删除时间';

COMMENT ON TABLE "public"."pep_organizers" IS '主办方';