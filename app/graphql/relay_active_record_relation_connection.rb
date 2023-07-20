class RelayActiveRecordRelationConnection < GraphQL::Pagination::ActiveRecordRelationConnection
  def has_previous_page
    if @has_previous_page.nil?
      @has_previous_page = if after_offset && after_offset > 0
        true
      elsif before_offset && !relation_offset(limited_nodes)&.zero?
        true
      elsif last
        # See whether there are any nodes _before_ the current offset.
        # If there _is no_ current offset, then there can't be any nodes before it.
        # Assume that if the offset is positive, there are nodes before the offset.
        limited_nodes
        !(@paged_nodes_offset.nil? || @paged_nodes_offset == 0)
      else
        false
      end
    end
    @has_previous_page
  end

  def limited_nodes
    @limited_nodes ||= begin
      calculate_sliced_nodes_parameters
      if @sliced_nodes_null_relation
        # it's an empty set
        return sliced_nodes
      end
      relation_limit = @sliced_nodes_limit
      relation_offset = @sliced_nodes_offset

      if first && (relation_limit.nil? || relation_limit > first)
        # `first` would create a stricter limit that the one already applied, so add it
        relation_limit = first
      end

      if before_offset
        relation_offset = before_offset - first - 1
        relation_offset = 0 if relation_offset < 0
      end

      if last
        if relation_limit
          if last <= relation_limit
            # `last` is a smaller slice than the current limit, so apply it
            relation_offset += (relation_limit - last)
            relation_limit = last
          end
        else
          # No limit, so get the last items
          sliced_nodes_count = relation_count(sliced_nodes)
          relation_offset += (sliced_nodes_count - [last, sliced_nodes_count].min)
          relation_limit = last
        end
      end

      @paged_nodes_offset = relation_offset
      paginated_nodes = items
      paginated_nodes = set_offset(paginated_nodes, relation_offset)
      if relation_limit
        paginated_nodes = set_limit(paginated_nodes, relation_limit)
      end
      paginated_nodes
    end
  end
end
