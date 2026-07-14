CREATE TABLE "public"."pep_ticket_check_rules" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "ticket_product_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "check_in_required" bool DEFAULT false,
  "min_check_in_times" int4,
  "enable_code_rotation" bool DEFAULT false,
  "code_rotation_interval_minutes" int4,
  "allow_manual_check" bool DEFAULT false,
  "allow_repeat_check" bool DEFAULT false,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_ticket_check_rules_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_ticket_check_rules_ticket_product_id_fkey" FOREIGN KEY ("ticket_product_id") REFERENCES "public"."pep_ticket_products" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
)
;

ALTER TABLE "public"."pep_ticket_check_rules" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."ticket_product_id" IS '关联票种模板ID：pep_ticket_products.id';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."check_in_required" IS '是否需要签到';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."min_check_in_times" IS '最小签到次数';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."enable_code_rotation" IS '是否启用轮换码';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."code_rotation_interval_minutes" IS '轮换码间隔：单位分钟';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."allow_manual_check" IS '是否允许人工核销';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."allow_repeat_check" IS '是否允许重复核销';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."created_by" IS '创建人';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."created_at" IS '创建时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."updated_by" IS '更新人';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."updated_at" IS '更新时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."is_deleted" IS '状态：是否已逻辑删除';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."deleted_by" IS '删除人';

COMMENT ON COLUMN "public"."pep_ticket_check_rules"."deleted_at" IS '删除时间：UTC';

COMMENT ON TABLE "public"."pep_ticket_check_rules" IS '检票规则表';


CREATE TABLE "public"."pep_ticket_instance_administrators" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "administrator_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "can_generate_code" bool DEFAULT true,
  "can_scan" bool DEFAULT true,
  "can_view_list" bool DEFAULT true,
  "can_manual_check" bool DEFAULT false,
  "can_view_reports" bool DEFAULT false,
  "current_rotation_code" varchar(200) COLLATE "pg_catalog"."default",
  "current_rotation_code_hash" varchar(200) COLLATE "pg_catalog"."default",
  "current_rotation_expires_at" timestamptz(6),
  "rotation_code_history" jsonb,
  "status_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "is_active" bool DEFAULT true,
  "ticket_instance_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_ticket_instance_administrators_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_ticket_instance_administrators_ticket_instance_id_fkey" FOREIGN KEY ("ticket_instance_id") REFERENCES "public"."pep_ticket_instances" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
)
;

ALTER TABLE "public"."pep_ticket_instance_administrators" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."administrator_id" IS '管理员用户ID';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."can_generate_code" IS '是否允许生成轮换码';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."can_scan" IS '是否允许扫码检票';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."can_view_list" IS '是否允许查看待检列表';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."can_manual_check" IS '是否允许人工核销';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."can_view_reports" IS '是否允许查看报表';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."current_rotation_code" IS '当前管理员轮换码';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."current_rotation_code_hash" IS '当前管理员轮换码哈希';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."current_rotation_expires_at" IS '当前管理员轮换码过期时间';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."rotation_code_history" IS '管理员轮换码历史';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."status_id" IS '实例管理员记录状态：字典ID';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."is_active" IS '管理员是否启用';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."ticket_instance_id" IS '关联票证实例ID：pep_ticket_instances.id';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."created_by" IS '创建人';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."created_at" IS '创建时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."updated_by" IS '更新人';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."updated_at" IS '更新时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."is_deleted" IS '状态：是否已逻辑删除';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."deleted_by" IS '删除人';

COMMENT ON COLUMN "public"."pep_ticket_instance_administrators"."deleted_at" IS '删除时间：UTC';

COMMENT ON TABLE "public"."pep_ticket_instance_administrators" IS '票实例管理员表';



CREATE TABLE "public"."pep_ticket_instance_holders" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "holder_id" varchar(64) COLLATE "pg_catalog"."default",
  "ticket_number" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "code_type_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "code" varchar(200) COLLATE "pg_catalog"."default" NOT NULL,
  "code_hash" varchar(200) COLLATE "pg_catalog"."default",
  "code_format_id" varchar(64) COLLATE "pg_catalog"."default",
  "status_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "first_check_in_time" timestamptz(6),
  "last_check_in_time" timestamptz(6),
  "ticket_instance_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "notes" text COLLATE "pg_catalog"."default",
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_ticket_instance_holders_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_ticket_instance_holders_ticket_instance_id_fkey" FOREIGN KEY ("ticket_instance_id") REFERENCES "public"."pep_ticket_instances" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
)
;

ALTER TABLE "public"."pep_ticket_instance_holders" 
  OWNER TO "root";

CREATE INDEX "idx_ticket_holders_holder_instance" ON "public"."pep_ticket_instance_holders" USING btree (
  "tenant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "holder_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ticket_instance_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE is_deleted = false;

CREATE INDEX "idx_ticket_holders_lookup" ON "public"."pep_ticket_instance_holders" USING btree (
  "tenant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ticket_instance_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "code_hash" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE is_deleted = false;

CREATE INDEX "idx_ticket_holders_tenant_instance" ON "public"."pep_ticket_instance_holders" USING btree (
  "tenant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ticket_instance_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE is_deleted = false;

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."holder_id" IS '持有人用户ID';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."ticket_number" IS '票号：同一实例内唯一';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."code_type_id" IS '码类型:字典ID';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."code" IS '票码内容';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."code_hash" IS '票码哈希';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."code_format_id" IS '码格式:字典ID';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."status_id" IS '持有人票码记录状态：字典ID';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."first_check_in_time" IS '首次签到时间';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."last_check_in_time" IS '最后签到时间';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."ticket_instance_id" IS '关联票证实例ID：pep_ticket_instances.id';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."notes" IS '备注';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."created_by" IS '创建人';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."created_at" IS '创建时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."updated_by" IS '更新人';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."updated_at" IS '更新时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."is_deleted" IS '状态：是否已逻辑删除';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."deleted_by" IS '删除人';

COMMENT ON COLUMN "public"."pep_ticket_instance_holders"."deleted_at" IS '删除时间：UTC';

COMMENT ON TABLE "public"."pep_ticket_instance_holders" IS '实例持有人表';



CREATE TABLE "public"."pep_ticket_instances" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "ticket_product_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "title" jsonb NOT NULL,
  "description" jsonb,
  "background_image_creative_id" varchar(64) COLLATE "pg_catalog"."default",
  "color_code" varchar(7) COLLATE "pg_catalog"."default",
  "check_in_required" bool DEFAULT false,
  "min_check_in_times" int4,
  "enable_code_rotation" bool DEFAULT false,
  "code_rotation_interval_minutes" int4,
  "status_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "valid_from" timestamptz(6) NOT NULL,
  "valid_until" timestamptz(6) NOT NULL,
  "source_type_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "source_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "metadata" jsonb,
  "notes" text COLLATE "pg_catalog"."default",
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_ticket_instances_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_ticket_instances_ticket_product_id_fkey" FOREIGN KEY ("ticket_product_id") REFERENCES "public"."pep_ticket_products" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
)
;

ALTER TABLE "public"."pep_ticket_instances" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_ticket_instances"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_ticket_instances"."ticket_product_id" IS '关联票种模板ID：pep_ticket_products.id';

COMMENT ON COLUMN "public"."pep_ticket_instances"."title" IS '票证标题：多语言';

COMMENT ON COLUMN "public"."pep_ticket_instances"."description" IS '票证描述：多语言';

COMMENT ON COLUMN "public"."pep_ticket_instances"."background_image_creative_id" IS '背景素材ID';

COMMENT ON COLUMN "public"."pep_ticket_instances"."color_code" IS '主题色值：HEX';

COMMENT ON COLUMN "public"."pep_ticket_instances"."check_in_required" IS '是否需要签到';

COMMENT ON COLUMN "public"."pep_ticket_instances"."min_check_in_times" IS '最小签到次数';

COMMENT ON COLUMN "public"."pep_ticket_instances"."enable_code_rotation" IS '是否启用轮换码';

COMMENT ON COLUMN "public"."pep_ticket_instances"."code_rotation_interval_minutes" IS '轮换码间隔：单位分钟';

COMMENT ON COLUMN "public"."pep_ticket_instances"."status_id" IS '票证实例状态：字典ID';

COMMENT ON COLUMN "public"."pep_ticket_instances"."valid_from" IS '有效开始时间';

COMMENT ON COLUMN "public"."pep_ticket_instances"."valid_until" IS '有效结束时间';

COMMENT ON COLUMN "public"."pep_ticket_instances"."source_type_id" IS '来源类型';

COMMENT ON COLUMN "public"."pep_ticket_instances"."source_id" IS '来源业务ID';

COMMENT ON COLUMN "public"."pep_ticket_instances"."metadata" IS '扩展元数据JSON';

COMMENT ON COLUMN "public"."pep_ticket_instances"."notes" IS '备注';

COMMENT ON COLUMN "public"."pep_ticket_instances"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_ticket_instances"."created_by" IS '创建人';

COMMENT ON COLUMN "public"."pep_ticket_instances"."created_at" IS '创建时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_instances"."updated_by" IS '更新人';

COMMENT ON COLUMN "public"."pep_ticket_instances"."updated_at" IS '更新时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_instances"."is_deleted" IS '状态：是否已逻辑删除';

COMMENT ON COLUMN "public"."pep_ticket_instances"."deleted_by" IS '删除人';

COMMENT ON COLUMN "public"."pep_ticket_instances"."deleted_at" IS '删除时间：UTC';

COMMENT ON TABLE "public"."pep_ticket_instances" IS '票证实例表';



CREATE TABLE "public"."pep_ticket_product_price_plan_detail" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "ticket_product_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "pay_type_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "original_amount" int4 DEFAULT 0,
  "discount_amount" int4 DEFAULT 0,
  "ticket_price_plan_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "is_default" bool NOT NULL DEFAULT false,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_ticket_price_plan_detail_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_ticket_price_plan_detail_price_plan_fkey" FOREIGN KEY ("ticket_price_plan_id") REFERENCES "public"."pep_ticket_product_price_plans" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "pep_ticket_price_plan_detail_ticket_product_fkey" FOREIGN KEY ("ticket_product_id") REFERENCES "public"."pep_ticket_products" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "chk_ticket_price_plan_detail_amount" CHECK (original_amount >= 0 AND discount_amount >= 0)
)
;

ALTER TABLE "public"."pep_ticket_product_price_plan_detail" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."ticket_product_id" IS '关联票种模板ID：pep_ticket_products.id';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."pay_type_id" IS '支付方式：字典ID(points/token/cash)';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."original_amount" IS '原价金额：单位由pay_type决定';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."discount_amount" IS '折扣后金额：单位由pay_type决定';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."ticket_price_plan_id" IS '关联票价计划ID：pep_ticket_price_plans.id';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."is_default" IS '状态：是否默认支付方式明细';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."created_by" IS '创建人';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."created_at" IS '创建时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."updated_by" IS '更新人';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."updated_at" IS '更新时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."is_deleted" IS '状态：是否已逻辑删除';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."deleted_by" IS '删除人';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plan_detail"."deleted_at" IS '删除时间：UTC';

COMMENT ON TABLE "public"."pep_ticket_product_price_plan_detail" IS '票价计划明细表';



CREATE TABLE "public"."pep_ticket_product_price_plans" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "ticket_product_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "validity_start_at" timestamptz(6),
  "validity_end_at" timestamptz(6),
  "price_strategy_id" varchar(64) COLLATE "pg_catalog"."default",
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_ticket_price_plans_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_ticket_price_plans_ticket_product_id_fkey" FOREIGN KEY ("ticket_product_id") REFERENCES "public"."pep_ticket_products" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "chk_ticket_price_plans_validity" CHECK (validity_end_at IS NULL OR validity_start_at IS NULL OR validity_end_at >= validity_start_at)
)
;

ALTER TABLE "public"."pep_ticket_product_price_plans" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."ticket_product_id" IS '关联票种模板ID：pep_ticket_products.id';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."validity_start_at" IS '价格计划生效开始时间';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."validity_end_at" IS '价格计划生效结束时间';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."price_strategy_id" IS '价格策略ID：后续关联更复杂定价表';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."created_by" IS '创建人';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."created_at" IS '创建时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."updated_by" IS '更新人';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."updated_at" IS '更新时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."is_deleted" IS '状态：是否已逻辑删除';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."deleted_by" IS '删除人';

COMMENT ON COLUMN "public"."pep_ticket_product_price_plans"."deleted_at" IS '删除时间：UTC';

COMMENT ON TABLE "public"."pep_ticket_product_price_plans" IS '票种价格';



CREATE TABLE "public"."pep_ticket_products" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "name" jsonb NOT NULL,
  "description" jsonb,
  "background_creative_id" varchar(64) COLLATE "pg_catalog"."default",
  "color_code" varchar(7) COLLATE "pg_catalog"."default",
  "status_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "display_order" int4 DEFAULT 0,
  "ticket_type_id" varchar(64) COLLATE "pg_catalog"."default",
  "headcount_unit" int4 NOT NULL DEFAULT 1,
  "is_ticket_per_headcount" bool NOT NULL DEFAULT false,
  "quantity_total" int4,
  "quantity_sold" int4 NOT NULL DEFAULT 0,
  "quantity_available" int4 GENERATED ALWAYS AS (

CASE
    WHEN (quantity_total IS NULL) THEN NULL::integer
    ELSE GREATEST(0, (quantity_total - quantity_sold))
END
) STORED,
  "sale_start_at" timestamptz(6),
  "sale_end_at" timestamptz(6),
  "valid_start_at" timestamptz(6),
  "valid_end_at" timestamptz(6),
  "cancel_end_at" timestamptz(6),
  "usage_limit" int4 NOT NULL DEFAULT 1,
  "source_type_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "source_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "metadata" jsonb,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_ticket_products_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "chk_ticket_products_quantity_sold" CHECK (quantity_sold >= 0),
  CONSTRAINT "chk_ticket_products_sale_window" CHECK (sale_end_at IS NULL OR sale_start_at IS NULL OR sale_end_at >= sale_start_at),
  CONSTRAINT "chk_ticket_products_validity_window" CHECK (valid_end_at IS NULL OR valid_start_at IS NULL OR valid_end_at >= valid_start_at),
  CONSTRAINT "chk_ticket_products_usage_limit" CHECK (usage_limit > 0),
  CONSTRAINT "chk_ticket_products_headcount_unit" CHECK (headcount_unit > 0),
  CONSTRAINT "chk_ticket_products_quantity_total" CHECK (quantity_total IS NULL OR quantity_total > 0)
)
;

ALTER TABLE "public"."pep_ticket_products" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_ticket_products"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_ticket_products"."name" IS '票种名称：多语言';

COMMENT ON COLUMN "public"."pep_ticket_products"."description" IS '票种描述：多语言';

COMMENT ON COLUMN "public"."pep_ticket_products"."background_creative_id" IS '背景素材ID';

COMMENT ON COLUMN "public"."pep_ticket_products"."color_code" IS '主题色值：HEX';

COMMENT ON COLUMN "public"."pep_ticket_products"."status_id" IS '票种模板状态：字典ID';

COMMENT ON COLUMN "public"."pep_ticket_products"."display_order" IS '展示排序';

COMMENT ON COLUMN "public"."pep_ticket_products"."ticket_type_id" IS '票种类型：字典ID';

COMMENT ON COLUMN "public"."pep_ticket_products"."headcount_unit" IS '每张票对应人数';

COMMENT ON COLUMN "public"."pep_ticket_products"."is_ticket_per_headcount" IS '是否按人头计票';

COMMENT ON COLUMN "public"."pep_ticket_products"."quantity_total" IS '总库存：NULL表示不限量';

COMMENT ON COLUMN "public"."pep_ticket_products"."quantity_sold" IS '已售数量';

COMMENT ON COLUMN "public"."pep_ticket_products"."quantity_available" IS '可售数量';

COMMENT ON COLUMN "public"."pep_ticket_products"."sale_start_at" IS '开售时间';

COMMENT ON COLUMN "public"."pep_ticket_products"."sale_end_at" IS '停售时间';

COMMENT ON COLUMN "public"."pep_ticket_products"."valid_start_at" IS '有效期开始时间';

COMMENT ON COLUMN "public"."pep_ticket_products"."valid_end_at" IS '有效期结束时间';

COMMENT ON COLUMN "public"."pep_ticket_products"."cancel_end_at" IS '取消截止时间';

COMMENT ON COLUMN "public"."pep_ticket_products"."usage_limit" IS '单人限购';

COMMENT ON COLUMN "public"."pep_ticket_products"."source_type_id" IS '来源类型：activity/classroom/booking/...';

COMMENT ON COLUMN "public"."pep_ticket_products"."source_id" IS '来源业务ID';

COMMENT ON COLUMN "public"."pep_ticket_products"."metadata" IS '扩展元数据JSON';

COMMENT ON COLUMN "public"."pep_ticket_products"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_ticket_products"."created_by" IS '创建人';

COMMENT ON COLUMN "public"."pep_ticket_products"."created_at" IS '创建时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_products"."updated_by" IS '更新人';

COMMENT ON COLUMN "public"."pep_ticket_products"."updated_at" IS '更新时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_products"."is_deleted" IS '状态：是否已逻辑删除';

COMMENT ON COLUMN "public"."pep_ticket_products"."deleted_by" IS '删除人';

COMMENT ON COLUMN "public"."pep_ticket_products"."deleted_at" IS '删除时间：UTC';

COMMENT ON TABLE "public"."pep_ticket_products" IS '票种模板表';



CREATE TABLE "public"."pep_ticket_scan_events" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "holder_id" varchar(64) COLLATE "pg_catalog"."default",
  "event_type_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "scan_direction_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "scanner_id" varchar(64) COLLATE "pg_catalog"."default",
  "scanned_code" varchar(200) COLLATE "pg_catalog"."default" NOT NULL,
  "scanned_code_type_id" varchar(64) COLLATE "pg_catalog"."default",
  "checked_at" timestamptz(6) NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "manually_recorded" bool DEFAULT false,
  "manually_recorded_by_id" varchar(64) COLLATE "pg_catalog"."default",
  "location_info" jsonb,
  "device_info" jsonb,
  "is_valid" bool DEFAULT true,
  "validation_message" text COLLATE "pg_catalog"."default",
  "validation_notes" text COLLATE "pg_catalog"."default",
  "notes" text COLLATE "pg_catalog"."default",
  "metadata" jsonb,
  "request_id" varchar(64) COLLATE "pg_catalog"."default",
  "ticket_instance_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_ticket_scan_events_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_ticket_scan_events_ticket_instance_id_fkey" FOREIGN KEY ("ticket_instance_id") REFERENCES "public"."pep_ticket_instances" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
)
;

ALTER TABLE "public"."pep_ticket_scan_events" 
  OWNER TO "root";

CREATE INDEX "idx_scan_holder_count_valid" ON "public"."pep_ticket_scan_events" USING btree (
  "tenant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "holder_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ticket_instance_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "is_valid" "pg_catalog"."bool_ops" ASC NULLS LAST
) WHERE is_deleted = false;

CREATE INDEX "idx_scan_request_latest" ON "public"."pep_ticket_scan_events" USING btree (
  "tenant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "request_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ticket_instance_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "checked_at" "pg_catalog"."timestamptz_ops" DESC NULLS FIRST
) WHERE is_deleted = false;

CREATE INDEX "idx_ticket_scan_holder_count_valid" ON "public"."pep_ticket_scan_events" USING btree (
  "tenant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "holder_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ticket_instance_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE is_deleted = false AND is_valid = true;

CREATE INDEX "idx_ticket_scan_request_latest" ON "public"."pep_ticket_scan_events" USING btree (
  "tenant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "request_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ticket_instance_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "checked_at" "pg_catalog"."timestamptz_ops" DESC NULLS FIRST
) WHERE is_deleted = false AND request_id IS NOT NULL;

CREATE UNIQUE INDEX "uq_scan_idempotent_request" ON "public"."pep_ticket_scan_events" USING btree (
  "tenant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "request_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ticket_instance_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE request_id IS NOT NULL AND is_deleted = false;

CREATE UNIQUE INDEX "uq_ticket_scan_idempotent_request" ON "public"."pep_ticket_scan_events" USING btree (
  "tenant_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "request_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST,
  "ticket_instance_id" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
) WHERE is_deleted = false AND request_id IS NOT NULL;

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."holder_id" IS '持有人ID';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."event_type_id" IS '事件类型：字典ID';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."scan_direction_id" IS '扫描方向：字典ID';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."scanner_id" IS '扫描人ID';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."scanned_code" IS '被扫描码内容';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."scanned_code_type_id" IS '被扫代码类型：字典ID';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."checked_at" IS '检票/签到时间';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."manually_recorded" IS '是否人工记录';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."manually_recorded_by_id" IS '人工记录人ID';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."location_info" IS '位置信息JSON';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."device_info" IS '设备信息JSON';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."is_valid" IS '检票校验是否通过';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."validation_message" IS '校验结果消息';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."validation_notes" IS '校验备注';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."notes" IS '备注';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."metadata" IS '扩展元数据JSON';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."request_id" IS '接口幂等请求ID';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."ticket_instance_id" IS '关联票证实例ID：pep_ticket_instances.id';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."created_by" IS '创建人';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."created_at" IS '创建时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."updated_by" IS '更新人';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."updated_at" IS '更新时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."is_deleted" IS '状态：是否已逻辑删除';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."deleted_by" IS '删除人';

COMMENT ON COLUMN "public"."pep_ticket_scan_events"."deleted_at" IS '删除时间：UTC';

COMMENT ON TABLE "public"."pep_ticket_scan_events" IS '检票事件流水';



CREATE TABLE "public"."pep_ticket_source_bindings" (
  "id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "source_type_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "source_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "ticket_product_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "tenant_id" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "created_by" varchar(64) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "updated_by" varchar(64) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
  "is_deleted" bool DEFAULT false,
  "deleted_by" varchar(64) COLLATE "pg_catalog"."default",
  "deleted_at" timestamptz(6),
  CONSTRAINT "pep_ticket_source_bindings_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "pep_ticket_source_bindings_ticket_product_id_fkey" FOREIGN KEY ("ticket_product_id") REFERENCES "public"."pep_ticket_products" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
)
;

ALTER TABLE "public"."pep_ticket_source_bindings" 
  OWNER TO "root";

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."id" IS '主键ID';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."source_type_id" IS '来源类型';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."source_id" IS '来源业务ID';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."ticket_product_id" IS '关联票种模板ID';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."tenant_id" IS '租户ID';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."created_by" IS '创建人';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."created_at" IS '创建时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."updated_by" IS '更新人';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."updated_at" IS '更新时间：UTC';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."is_deleted" IS '状态：是否已逻辑删除';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."deleted_by" IS '删除人';

COMMENT ON COLUMN "public"."pep_ticket_source_bindings"."deleted_at" IS '删除时间：UTC';

COMMENT ON TABLE "public"."pep_ticket_source_bindings" IS '来源绑定表：维护业务对象与票种模板绑定关系';